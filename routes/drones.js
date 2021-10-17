const express = require('express');
const router = express.Router();
const dronesModel = require("./../models/Drone"); // require the Drone model here

  // Iteration #2: List the drones (attention au prefix)
router.get('/drones', (req, res, next) => {
  dronesModel.find()
    .then((dbSuccess) => res.render("drones/list.hbs", {drones:dbSuccess}))
    .catch(next)
});

 // Iteration #3: Add a new drone
router.get('/drones/create', function (req, res, next) {
  res.render("drones/create-form.hbs");
});

router.post('/drones/create', async function (req, res, next) {
  try {
    await dronesModel.create({
      ...req.body
    }); 
    res.redirect("/drones");
  } catch (err) {
    res.render("drones/create-form.hbs");
  }
});

// Iteration #4: Update the drone
router.get('/drones/:id([a-z0-9]{24})/edit', function (req, res, next) {
  dronesModel.findById(req.params.id)
  .then((drone) => res.render("drones/update-form.hbs", { drone }))
  .catch(next);
});

router.post('/drones/:id([a-z0-9]{24})/edit', async function (req, res, next) {
  try {
    await dronesModel.findByIdandUpdate(req.params.id, {
      ...req.body,
    }); 
    res.redirect("/drones");
  } catch (err) {
    res.render("drones/update-form.hbs"); 
  }
});

  // Iteration #5: Delete the drone
router.get('/drones/:id([a-z0-9]{24})/delete', (req, res, next) => {
  dronesModel.findByIdAndRemove(req.params.id)
  .then(() => res.redirect("/drones"))
  .catch(next);
});

module.exports = router;
