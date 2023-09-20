const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: 'http://localhost:3000' } });

// To keep track of the active quizzes
const activeQuizzes = new Map();

// Set up your other Express middleware and routes here
app.get('/', (req, res) => {
    io.emit('message', 'Hello World!');
    res.send('OK');
});

io.on('connection', (socket) => {
    socket.on('CreateQuiz', (data) => {
        const quizId = generateUniqueQuizId();
        const quiz = {
            quizId,
            creator: socket.id,
            players: [],
            questions: data.questions,
        };
        activeQuizzes.set(quizId, quiz);
        socket.join(quizId);
        socket.emit('CreatedQuiz', { quizId });
    });

    socket.on('JoinQuiz', (data) => {
        const quizId = data.quizId;
        const username = data.username;
        const quiz = activeQuizzes.get(quizId);

        if (quiz) {
            quiz.players.push({ socketId: socket.id, username });
            socket.join(quizId);
            socket.emit('JoinedQuiz', { quizId });
            console.log(`${username} joined quiz ${quizId}`);
        } else {
            socket.emit('Error', { message: 'Quiz does not exist' });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// To generate unique 6 digit quiz ID
function generateUniqueQuizId() {
    //generate unique 6 digit quiz ID
    let quizId = Math.floor(100000 + Math.random() * 900000);
    while (activeQuizzes.has(quizId)) {
        quizId = Math.floor(100000 + Math.random() * 900000);
    }
    return quizId;
}

// Create a test room with room ID "1234"
const testRoomId = '1234';
const testQuiz = {
    quizId: testRoomId,
    creator: null, // Set the creator to null for the test room
    players: [],
    questions: [], // You can add test questions here if needed
};
activeQuizzes.set(testRoomId, testQuiz);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});

async function getQuestion(options){

    try {
        if (!options) {
          throw new Error('Options object is undefined');
        }    

        const numOfQuestion = options.numOfQuestion
        const category = options.category
        const difficulty = options.difficulty

        let apiLink = "https://opentdb.com/api.php?amount="

        if (parseInt(numOfQuestion) > 0){
            apiLink += numOfQuestion
        }
        
        console.log('apiLink: ', apiLink);

        const responce = await fetch()

    } catch (error) {
    console.error('Error in getQuestion:', error.message);
    // Handle the error, such as logging or displaying an error message
    }
}


