// import React from "react";
// import "./styles.css";

// export default function App() {
//     function mouseDownHandler(event) {
//         event.persist();
//         const isTouch =
//             "ontouchstart" in window ||
//             navigator.maxTouchPoints > 0 ||
//             navigator.msMaxTouchPoints > 0;
//         const { clientWidth, clientHeight, offsetLeft, offsetTop } =
//             event.currentTarget;
//         if (!isTouch) {
//             const { clientX, clientY } = event;
//             const { offsetX, offsetY } = event.nativeEvent;
//             console.log("Showing wrong the values taken from the react event");
//             console.log({
//                 clientX,
//                 clientY,
//                 clientWidth,
//                 clientHeight,
//             });
//             console.log(
//                 "Showing the alternative values taken from the native event"
//             );
//             console.log({
//                 offsetX,
//                 offsetY,
//                 clientWidth,
//                 clientHeight,
//             });
//         } else {
//             const { targetTouches: [targetEvent] = [] } = event.nativeEvent;
//             if (targetEvent) {
//                 console.log(targetEvent);
//                 const { offsetX, offsetY } = event.nativeEvent;
//                 console.log(event.nativeEvent);
//                 console.log({ offsetX, offsetY });
//                 const { clientX, clientY } = targetEvent;
//                 const x = clientX - offsetLeft;
//                 const y = clientY - offsetTop;
//                 console.log(
//                     `Touch event detected at positions X:${
//                         clientX - offsetLeft
//                     } and Y:${clientY - offsetTop}`
//                 );
//                 console.log({
//                     x,
//                     y,
//                     clientWidth,
//                     clientHeight,
//                 });
//             }
//         }
//     }
//     return (
//         <div
//             style={{ width: 300, height: 300, backgroundColor: "blue" }}
//             onMouseDown={mouseDownHandler}
//             onTouchStart={mouseDownHandler}
//         />
//     );
// }
