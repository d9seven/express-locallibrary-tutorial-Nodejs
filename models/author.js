var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AuthorSchema = new Schema({
  first_name: {type: String, required: true, max: 100},
  last_name: {type: String, required: true, max: 100},
  date_of_birth: {type: Date},
  date_of_death: {type: Date}
});

// Virtual for author's full name
AuthorSchema.virtual('name').get(function(){
  return this.last_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function(){
  var lifespan;
  if (this.date_of_birth == null || this.date_of_death == null){
    lifespan = 'N/A';
  }else{
    var birth = this.date_of_birth.getYear();
    var death = this.date_of_death.getYear();
    if (birth > death){
      lifespan = (birth - death).toString();
    }else{
      lifespan = (death - birth).toString();
    }
  }
  return lifespan;
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function(){
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
