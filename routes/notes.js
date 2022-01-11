const { getByTitle } = require("@testing-library/react");
const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

router.get("/getNotes", fetchuser, async (req, res) => {
  try {
    const data = await Note.find({ user: req.user.id });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/addNotes",
  fetchuser,
  [
    body("title", "short title").isLength({ min: 2 }),
    body("description", "Short description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;

    try {
      const user = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      user_saved = await user.save();
      // const data_saved=await user.save();
      res.json({ user_saved });
    } catch (error) {
      console.log(error);
      res.status(500).json("Some internal error");
    }
  }
);

// Route 3 : Updating an existing note using PUT "api/notes/updateNote"

router.put("/updateNote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  let note = await Note.findById(req.params.id);
  if (!note) {
    res.status(404).send("Data not found");
  }
  // console.log(req.user.id);
  // console.log(note.user.toString());

  if (req.user.id != note.user.toString()) {
    res.status(401).send("Unauthorized authentication");
  }

  const newnote = {};
  if (title) {
    newnote.title = title;
  }
  if (description) {
    newnote.description = description;
  }
  if (tag) {
    newnote.tag = tag;
  }

  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newnote },
    { new: true }
  );
  res.json({ note });
});



// Route 4 : deleting an existing note using PUT "api/notes/deleteNote"

router.delete("/deleteNote/:id", fetchuser, async (req, res) => {

  
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("data not found");
    }
  
    if (req.user.id != note.user.toString()) {
      res.status(401).send("Unauthorized authentication");
    }
  

  
   note =await Note.findByIdAndDelete(req.params.id);
    res.json({"Success":"Succesucfully deleted" ,"note" :note});
  });

module.exports = router;
