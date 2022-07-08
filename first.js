import fs from "fs";
const quote = "live more, worry less :) :)";
const [, , num] = process.argv;
console.log(num);

for (let index = 1; index <= num; index++) {
  //writing file
  // if folder is not available it will throw error
  fs.writeFile(`./Backup/text-${index}.txt`, quote, (err) => {
    if (err) throw err;
    console.log("saved");
  });
}

// Reading file
// if wrong file - no such file / directory present

fs.readFile("./Backup/text.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// appending file

fs.appendFile("./Backup/nice.txt", "\nWelcome to Goa singham", (err) => {
  if (err) throw err;
});

// delete file

fs.unlink("./Backup/delete.txt", (err) => {
  if (err) throw err;
  console.log("file deleted");
});
