const {MOVE_UP_KEY, MOVE_LEFT_KEY, MOVE_DOWN_KEY, MOVE_RIGHT_KEY} = require('./constants')

// Stores the active TCP connection object.
// Set in global scope to be used by other functions
let connection;
/**
 * Setup User Interface 
 * Specifically, so that we can handle user input via stdin
 */

const setupInput = function (conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  stdin.on('data', (key) => {
    handleUserInput(key, connection)
  })
  return stdin;
}

/* 
 *Handle user input
 * This allows us to terminate the app easily using ctrl + c
 */
const handleUserInput = function (key, conn) {
  if (key === '\u0003') {
    process.exit();
  }
  // Supported move commands
    // Snakes cannot instantly make a 180 turn by moving in the opposite direction
  if (key === 'w') {
    conn.write(MOVE_UP_KEY)
  } else if (key === 'a') {
    conn.write(MOVE_LEFT_KEY)
  } else if (key === 's'){
    conn.write(MOVE_DOWN_KEY)
  } else if (key === 'd') {
    conn.write(MOVE_RIGHT_KEY)
  } else if (key === 'i') {
    conn.write("Say: hellloo")
  } else if (key === 'l'){
    conn.write("Say: Cool.")
  }
}


module.exports = setupInput;