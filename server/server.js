const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: 'http://localhost:3000' } });
const axios = require('axios');

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
            io.to(quizId).emit("UpdatePlayers", { players: quiz.players });
            console.log(`${username} joined quiz ${quizId}`);
        } else {
            socket.emit('Error', { message: 'Quiz does not exist' });
        }
        
        // if player disconects remove them from the player list
        socket.on('disconnect', () => {
            quiz.players = quiz.players.filter((player) => player.socketId !== socket.id);
            console.log(`${username} disconnected from quiz ${quizId}`);
            io.to(quizId).emit("UpdatePlayers", { players: quiz.players });
        });
        
    });
    

    socket.on('PlayerList', (data) => {
        quizId = data.quizId;
        const quiz = activeQuizzes.get(quizId);
        if (quiz) {
            socket.emit('PlayerList', { players: quiz.players });
        } else {
            socket.emit('Error', { message: 'Quiz does not exist' });
        }
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on("getQuestion", async (options) => {

        let apiLink = "https://opentdb.com/api.php?"

        if (options.numOfQuestions) {
            apiLink = apiLink + "amount=" + options.numOfQuestions
        }else {
            return
        }

        if (options.category && options.category != "Any"){
            apiLink = apiLink + "&category=" + options.category 
        }

        if (options.difficulty && options.difficulty != "Any"){
            apiLink = apiLink + "&difficulty=" + options.difficulty 
        }


        const timePerQuestion = options.timePerQuestion
        const question = await fetchQuestions(apiLink)
        
        const quizData = {
            question: question,
            timePerQuestion: timePerQuestion
        }

        socket.emit()
    })
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

async function fetchQuestions(apiLink) {
    try {
      const response = await axios.get(apiLink);
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (error) {
      console.error(error);
      // If you want to propagate the error, you can re-throw it here:
      throw error;
    }
  }

