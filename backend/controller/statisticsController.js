const { MongoClient } = require('mongodb');
const math = require('mathjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const uri = process.env.MONGODB_URI;
const dbName = 'sensordata';

async function calculateStatistics(req, res) {
    const client = new MongoClient(uri);
    let responseSent = false; // Variável para controlar se a resposta foi enviada

    try {
        await client.connect();
        const db = client.db(dbName);
        const readingsCollection = db.collection('readings');
        const statisticsCollection = db.collection('statistics');

        // Obtém os dados de readings
        const data = await readingsCollection.find({}, { projection: { _id: 0, humidity: 1, temperature: 1, timestamp: 1 } }).toArray();

        if (!data || data.length === 0) {
            if (!responseSent) {
                responseSent = true;
                return res.status(400).json({ message: "Nenhum dado encontrado para cálculo de estatísticas." });
            }
        }

        // Converte os dados para arrays de umidade e temperatura
        const humidity = data.map(item => item.humidity);
        const temperature = data.map(item => item.temperature);

        // Função para calcular a moda
        function mode(arr) {
            const freq = {};
            let maxFreq = 0;
            let modeValue = null;
            for (const num of arr) {
                freq[num] = (freq[num] || 0) + 1;
                if (freq[num] > maxFreq) {
                    maxFreq = freq[num];
                    modeValue = num;
                }
            }
            return modeValue;
        }

        // Função para determinar distribuição aproximada
        function determineDistribution(arr) {
            const skewness = calculateSkewness(arr);
            return Math.abs(skewness) < 0.5 ? 'normal' : 'não normal';
        }

        // Cálculos de estatísticas para umidade
        const humidityStats = {
            mean: math.mean(humidity),
            median: math.median(humidity),
            mode: mode(humidity),
            standardDeviation: math.std(humidity),
            skewness: calculateSkewness(humidity),
            kurtosis: calculateKurtosis(humidity),
            futureProjection: linearRegression(humidity).slope,
            probability: humidity.filter(h => h > math.mean(humidity)).length / humidity.length,
            distribution: determineDistribution(humidity)
        };

        // Cálculos de estatísticas para temperatura
        const temperatureStats = {
            mean: math.mean(temperature),
            median: math.median(temperature),
            mode: mode(temperature),
            standardDeviation: math.std(temperature),
            skewness: calculateSkewness(temperature),
            kurtosis: calculateKurtosis(temperature),
            futureProjection: linearRegression(temperature).slope,
            probability: temperature.filter(t => t > math.mean(temperature)).length / temperature.length,
            distribution: determineDistribution(temperature)
        };

        // Estrutura para salvar os dados de estatísticas no MongoDB
        const statistics = {
            humidity: humidityStats,
            temperature: temperatureStats,
            createdAt: new Date()
        };

        // Insere os dados no MongoDB
        const result = await statisticsCollection.insertOne(statistics);

        if (result.acknowledged && !responseSent) {
            responseSent = true;
            return res.status(200).json({ message: "Estatísticas calculadas e salvas no MongoDB com sucesso!" });
        } else if (!responseSent) {
            responseSent = true;
            return res.status(500).json({ message: "Falha ao salvar estatísticas no MongoDB." });
        }
    } catch (error) {
        console.error("Erro ao calcular e salvar estatísticas:", error);

        if (!responseSent) {
            responseSent = true;
            return res.status(500).json({ message: "Erro ao calcular e salvar estatísticas", error: error.message });
        }
    } finally {
        await client.close();
    }
}


async function getStatistics(req, res) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(dbName);
        const statisticsCollection = db.collection('statistics');

        // Busca a última estatística calculada, ordenando pela data
        const latestStatistics = await statisticsCollection.findOne({}, {
            sort: { createdAt: -1 }  // Ordena pela data de criação (campo createdAt)
        });

        if (!latestStatistics) {
            console.log("Nenhuma estatística encontrada.");
            return res.status(404).json({ message: "Nenhuma estatística encontrada." });
        }

        // Retorna as estatísticas calculadas
        res.status(200).json(latestStatistics);
    } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        res.status(500).json({ message: "Erro ao buscar estatísticas", error: error.message });
    } finally {
        await client.close();
    }
}

// Função para calcular a assimetria (skewness)
function calculateSkewness(arr) {
    const mean = math.mean(arr);
    const stdDev = math.std(arr);
    const n = arr.length;
    return (n * math.sum(arr.map(x => Math.pow((x - mean) / stdDev, 3)))) / ((n - 1) * (n - 2));
}

// Função para calcular a curtose (kurtosis)
function calculateKurtosis(arr) {
    const mean = math.mean(arr);
    const stdDev = math.std(arr);
    const n = arr.length;
    return (n * (n + 1) * math.sum(arr.map(x => Math.pow((x - mean) / stdDev, 4)))) / ((n - 1) * (n - 2) * (n - 3)) - (3 * Math.pow(n - 1, 2) / ((n - 2) * (n - 3)));
}

// Função para calcular a regressão linear e retornar a projeção
function linearRegression(arr) {
    const n = arr.length;
    const x = arr.map((_, i) => i);
    const y = arr;
    const xMean = math.mean(x);
    const yMean = math.mean(y);
    
    const num = x.reduce((sum, xi, i) => sum + (xi - xMean) * (y[i] - yMean), 0);
    const den = x.reduce((sum, xi) => sum + Math.pow(xi - xMean, 2), 0);
    
    const slope = num / den;
    const intercept = yMean - slope * xMean;

    return { slope, intercept };
}

module.exports = { calculateStatistics, getStatistics };
