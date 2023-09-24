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
    socket.on('CreateQuiz', async (data, cb) => {
        const quizId = generateUniqueQuizId();
        const questions = await getQuestions(data.options);
        const quiz = {
            quizId,
            creator: socket.id,
            players: [],
            questions: questions,
            timePerQuestion: data.options.timePerQuestion,
            quizInterval: null, // Initialize the quiz interval
            currentQuestionIndex: 0,
        };
        activeQuizzes.set(quizId.toString(), quiz);
        socket.join(quizId);
        cb(quizId);
        console.log(`Quiz ${quizId} created`); // TRY LOGGING activeQuizzes.get(quizId)

        socket.on("disconnect", () => {
            activeQuizzes.delete(quizId);
            console.log(`Quiz ${quizId} deleted`);
        }); 
    });

    socket.on("QuestionAnswer", (data) => {
        const quizId = data.quizId
        const quizRoom = activeQuizzes.get(quizId);

        const player = quizRoom.players.find((player) => player.socketId === socket.id);
        player.score ++
    })

    function sendScores(quizId){
        const quizRoom = activeQuizzes.get(quizId);
        const players = quizRoom.players

        io.to(quizId).emit("ReceiveScores", {players})
    }
    

    function startQuizLoop(quizId, quiz) {

        const questions = quiz.questions;
        const totalQuestions = questions.length
        let currentQuestionIndex = quiz.currentQuestionIndex;

        const interval = quiz.timePerQuestion * 1000

        return setInterval(() => {
            if (currentQuestionIndex < totalQuestions) {
                const currentQuestion = questions[currentQuestionIndex];
                const questionCategory = currentQuestion.category
                // Notify clients about the current question and timer for this quiz room
                io.to(quizId).emit('NextQuestion', { question: currentQuestion, interval, currentQuestionIndex, totalQuestions, quizId, questionCategory  });
                currentQuestionIndex++;
            } else {
                // Quiz is finished, stop the loop for this quiz room
                clearInterval(quiz.quizInterval);
                quiz.quizInterval = null;
                io.to(quizId).emit("QuizDone")
                sendScores(quizId)
                return
            }
        }, interval); // Adjust the interval duration
    }

    socket.on('StartGame', (data) => {
        io.to(data.quizId).emit("GameStarted");

        // Find the quiz room by quizId
        const quizRoom = activeQuizzes.get(data.quizId);

        if (quizRoom && !quizRoom.quizInterval) {
            startQuizLoop(data.quizId, quizRoom);
        }
    });

    socket.on('JoinQuiz', (data) => {
        const quizId = data.quizId;
        const username = data.username;
        const quiz = activeQuizzes.get(quizId);
        const score = 0

        if (quiz) {
            if (username){
                quiz.players.push({ socketId: socket.id, username, score });
                socket.join(quizId);
                io.to(quizId).emit("UpdatePlayers", { players: quiz.players });
                console.log(`${username} joined quiz ${quizId}`);
            }
                
        } else {
            socket.emit('Error', { message: 'Quiz does not exist' });
        }
        
        // if player disconects remove them from the player list
        socket.on('disconnect', () => {
            quiz.players = quiz.players.filter((player) => player.socketId !== socket.id);
            io.to(quizId).emit("UpdatePlayers", { players: quiz.players });
            console.log(`${username} disconnected from quiz ${quizId}`);
        });

        socket.on('removePlayer' , (data) => {
            quiz.players = quiz.players.filter((player) => player.socketId !== data.socketId);
            io.to(quizId).emit("UpdatePlayers", { players: quiz.players });
            console.log(`${username} disconnected from quiz ${quizId}`);
        });
    });
    
    // Check if room exists
    socket.on("ValidateInputs", (data, cb) => {
        const quiz = activeQuizzes.get(data.quizId); 
        console.log('activeQuizzes: ', activeQuizzes.keys());
        if (quiz) {
            const username = quiz.players.find(p => p.username === data.username);
            if (username) {
                cb({error: true, msg: "User with this name exists!" });
            } else cb({error: false});
        } else cb({error: true, msg: "Room doesn't exists!"});
    });

    /* socket.on("disconnect", (data) => {
        const quiz = activeQuizzes.get(data.quizId);
        if (quiz) {
            quiz.players = quiz.players.filter((player) => player.socketId !== socket.id);
            io.to(data.quizId).emit("UpdatePlayers", { players: quiz.players });
            console.log(`${data.username} disconnected from quiz ${data.quizId}`);
        }
    }); */
});


const getQuestions = async (options) => {
    let apiLink = "https://opentdb.com/api.php?"

    if (options.numOfQuestions) {
        apiLink = apiLink + "amount=" + options.numOfQuestions;
    }else {
        return;
    }

    if (options.category && options.category != "Any"){
        apiLink = apiLink + "&category=" + options.category;
    }

    if (options.difficulty && options.difficulty != "Any"){
        apiLink = apiLink + "&difficulty=" + options.difficulty;
    }

    const questions = await fetchQuestions(apiLink);
    return questions.results;
};

// To generate unique 4 digit quiz ID
function generateUniqueQuizId() {
    // generate a random 4 digit number
    let quizId = Math.floor(1000 + Math.random() * 9000);
    while (activeQuizzes.has(quizId)) {
        quizId = Math.floor(1000 + Math.random() * 9000);
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

