const bands = require("./data/bands");
const dbConnection = require("./config/mongoConnection");

const main = async () => {
  //console.log("test111");
  //const db = await connection.connectToDb();
  //console.log("test222");
  const db = await dbConnection();
  //await db.dropDatabase();
  let band1 = undefined;
  let band2 = undefined;
  let band3 = undefined;

  // Step 1
  try {
    band1 = await bands.create(
      "Pink Floyd",
      ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
      "http://www.pinkfloyd.com",
      "EMI",
      [
        "Roger Waters",
        "David Gilmour",
        "Nick Mason",
        "Richard Wright",
        "Sid Barrett",
      ],
      1965
    );
    console.log(band1);
  } catch (e) {
    console.log(e);
  }

  //Step 2
  try {
    band2 = await bands.create(
      "The Beatles",
      ["Rock", "Pop", "Psychedelia"],
      "http://www.thebeatles.com",
      "Parlophone",
      ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
      1960
    );
    //console.log(band2);
    let allBands = await bands.getAll();
    console.log(allBands);
  } catch (e) {
    console.log(e);
  }

  // Step 3
  try {
    band2 = await bands.create(
      "Project EX",
      ["ANKITA", "SHAMALI", "PRIYA"],
      "http://www.theprojectstud.com",
      "Krypto",
      ["Mani", "Abhinaya", "Kinjal", "Taran"],
      1993
    );
    console.log(band2);
  } catch (e) {
    console.log(e);
  }

  try {
    band2 = await bands.rename("62144c57b3121c6461c916aa", "Pink Floyd Alterd");
    //let bandAltered = await bands.get("621440d1e637e66218357060")
    console.log(band2);
  } catch (e) {
    console.log(e);
  }

  try {
    // band2 = await bands.remove("621440d1e637e66218357060"
    // );
    let allBands = await bands.getAll();
    console.log(allBands);
  } catch (e) {
    console.log(e);
  }

  try {
    band1 = await bands.create(
      "Hee",
      ["Helleo", "Psychedelic rock", "Hell"],
      "http://www.pinki.com",
      "Hello",
      [
        "Roger Waters",
        "David Gilmour",
        "Nick Mason",
        "Richard Wright",
        "Sid Barrett",
      ],
      2022
    );
    console.log(band1);
  } catch (e) {
    console.log(e);
  }

  try {
    let allBands = await bands.getAll();
    console.log(allBands);
  } catch (e) {
    console.log(e);
  }

  // Close connection
  //   await connection.closeConnection();

  await db.serverConfig.close();
  console.log("Done!");
};
main();
