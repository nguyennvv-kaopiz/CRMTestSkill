const pipelineService = require('../services/pipeline.service');

async function getStages(req, res) {
  try {
    const stages = await pipelineService.getStages();
    res.json(stages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getStages };
