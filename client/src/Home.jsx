import { Link } from "react-router-dom";
import myImage from './img/Wizard.png';
import { useEffect, useState } from "react";

function Home(){

    const [color, setColor] = useState('black'); // Initial color

    const imageStyle = {
        width: '400px',
        height: 'auto',
      };

      useEffect(() => {
        // Function to generate a random color
        function getRandomColor() {
          const letters = '0123456789ABCDEF';
          let newColor = '#';
          for (let i = 0; i < 6; i++) {
            newColor += letters[Math.floor(Math.random() * 16)];
          }
          return newColor;
        }
    
        // Change the color every 1000 milliseconds (1 second)
        const intervalId = setInterval(() => {
          const newColor = getRandomColor();
          setColor(newColor);
        }, 300);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, []);


    return <>
    <div className="text-center mt-5">
        <h1 style={{color}}>Welcome to QuizWiz</h1>
        <p className="mt-5"></p>
        <h4>Made by: Emile and Jeremy</h4>
        <div>
            <img src={myImage} alt="Wizzard" style={imageStyle}/>
        </div>
        <Link to="/selectCategory">
        <button className="btn btn-success px-5 py-2 fs-4 mt-5">Create Room</button>
        <button className="btn btn-success px-5 py-2 fs-4 mt-5 ms-5">Join Room</button>
        </Link>

    </div>
    </>
}
export default Home;