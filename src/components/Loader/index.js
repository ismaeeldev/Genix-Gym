// import React, { useEffect } from "react";
// import $ from "jquery";

// const Loader = () => {
//     useEffect(() => {
//         // Initialize foreground particles
//         $("#particles-foreground").particleground({
//             dotColor: "#ff4b5c",
//             lineColor: "#ff4b5c",
//             minSpeedX: 0.3,
//             maxSpeedX: 0.6,
//             minSpeedY: 0.3,
//             maxSpeedY: 0.6,
//             density: 10000,
//             particleRadius: 4,
//             curvedLines: true,
//             proximity: 100,
//             parallaxMultiplier: 10,
//             onInit: () => {
//                 console.log("Foreground particles initialized");
//             },
//             onDestroy: () => {
//                 console.log("Foreground particles destroyed");
//             },
//         });

//         // Initialize background particles
//         $("#particles-background").particleground({
//             dotColor: "#7c8b92",
//             lineColor: "#7c8b92",
//             minSpeedX: 0.075,
//             maxSpeedX: 0.15,
//             minSpeedY: 0.075,
//             maxSpeedY: 0.15,
//             density: 10000,
//             particleRadius: 2,
//             curvedLines: true,
//             proximity: 150,
//             parallaxMultiplier: 5,
//             onInit: () => {
//                 console.log("Background particles initialized");
//             },
//             onDestroy: () => {
//                 console.log("Background particles destroyed");
//             },
//         });
//     }, []);

//     return (
//         <div>
//             <div
//                 id="particles-foreground"
//                 style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
//             ></div>
//             <div
//                 id="particles-background"
//                 style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
//             ></div>
//         </div>
//     );
// };

// export default Loader;
