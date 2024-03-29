const professionMock = require("../mock/professions.json");
const qualitiesMock = require("../mock/qualities.json");
const Profession = require("../models/Profession");
const Quality = require("../models/Quality");
module.exports = async () => {
  const professions = await Profession.find();
  if (professions.length !== professionMock.length) {
    createInitialEntity(Profession, professionMock);
  }
  const qualities = await Quality.find();
  if (qualities.length !== qualitiesMock.length) {
    createInitialEntity(Quality, qualitiesMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (i) => {
      try {
        delete i._id;
        const newItem = new Model(i);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
