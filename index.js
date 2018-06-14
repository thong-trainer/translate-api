// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');
const express = require('express');
const app = express();

// Your Google Cloud Platform project ID
const projectId = 'af93dfaf54cf1232e2bcbfd237da291d254ef82f';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
});




app.get('/api/translation', function(req, res, next){
	// The text to translate
    const text = req.query.text;
    // The target language (eg: en, km, ...)
    const target = req.query.target;
    
    if ( text == undefined && target == undefined) {
    	res.send("Bad Query");
    	return;
    }

	// Translates some text into Russian
	translate
	  .translate(text, target)
	  .then(results => {
	    const translation = results[0];

	    console.log(`Text: ${text}`);
	    console.log(`Translation: ${translation}`);
	    res.send(translation);
	  })
	  .catch(err => {
	    console.error('ERROR:', err);
	    res.send("Translation Error");
	 });
 
});  



// error handling middleware
app.use(function(err, req, res, next){
  console.log(err);
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;
  res.status(status).send({error: error.message});
});

// listen for requests
app.listen(process.env.port || 8090, function(){
  console.log('now listening on port: localhost:8090');
});