/**
 * Streams allow the software to start to parse the content of a file before it's be completely finished.
 * this is possible by parsing chunks of data as it's being downloaded.
 * 
 *  there is two types of streams -> readable streams and writeable streams
 * 
 * readable streams (when receiving data) / writeable streams (whe sending data)
 * 
 * to node, every input or output port is a stream 
 * 
 * in this analogy, the http request and respons are streams
 * in this case, both I can receive data gradually with the request stream or I can send data with the request stream gradually
 * 
 * stdin and stdout are the input and output of the processes by the terminal
 * 
 * the pipe method of the process.stdin.pipe() is an whey to send to somewhere the data that I'm reading in the terminal
 */

import { Readable, Writable, Transform } from 'node:stream';


class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;
    
    setTimeout(() => {
      if (i > 100) this.push(null)
      else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }      
    }, 1000);
    
  }
}


class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback()
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed)));
  }
}

new OneToHundredStream() // readable streams I just can read data with it
  .pipe(new InverseNumberStream()) // transform streams I just can transform data with it
  .pipe(new MultiplyByTenStream()); // writeable streams I just can write data with it