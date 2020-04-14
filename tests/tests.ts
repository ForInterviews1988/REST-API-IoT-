var chai_module = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/index.ts');
var should = chai_module.should();

chai_module.use(chaiHttp);


/* describe('Beecons', function() {
    it('should list ALL beecons on /beecons GET');
    it('should list a SINGLE beecon on /beecons/<id> GET');
    it('should add a SINGLE beecon on /beecons POST');
    it('should update a SINGLE beecon on /beecons/<id> PUT');
    it('should delete a SINGLE beecon on /beecons/<id> DELETE');
  });



  it('should list ALL beecons on /beecons GET', function(done) {
    chai_module.request('http://localhost:3000')
      .get('/beecons?page=1&limit=1')
      .end(function(err, res){
        res.should.have.status(200);
         done();
      });
  });

  it('should add a SINGLE beecon on /beecons POST', function(done) {
    chai_module.request('http://localhost:3000')
      .post('/beecons')
      .set('content-type', 'application/json')
      .send({beeconid : 2991910,  datamatrix: '2322020212222255222212323223',mac : "sdtrsssdssztssgsggqdqdsqdsSss", status:"FREE" })
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  it('  should list a SINGLE beecon on /beecons/<id>', function(done) {
    chai_module.request('http://localhost:3000')
      .get('/beecons/19')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });


   it('should update a SINGLE beecon on /beecons/<id>',   function(done) {
        chai_module.request('http://localhost:3000')
      .put('/beecons/20')
      .set('content-type', 'application/json')
      .send({datamatrix: '111111424121111232222222232', mac : "dadsddsddsessdswssdqdqsdqdssSSssss", status:'FREE'})
      .end(function(err, res){
        res.should.have.status(200);
      done();
      });
  });   


  it('should delete a SINGLE beecon on /beecons/<id> DELETE', function(done) {
    chai_module.request('http://localhost:3000')
      .delete('/beecons/21')
      .end(function(err, res){
        res.should.have.status(200);
         done();
      });
  });

 */

   describe('Jouneys', function() {
    it('should list ALL journeys on /beecons GET');
    it('should list a SINGLE journey on /journeys/<id> GET');
    it('should add a SINGLE journey on /journeys POST');
    it('should update a SINGLE journey on /journeys/<id> PUT');
    it('should delete a SINGLE journey on /journeys/<id> DELETE');
  });

  it('should list ALL journeys on /journeys GET', function(done) {
    chai_module.request('http://localhost:3000')
      .get('/journeys?page=1&limit=1')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;

         done();
      });
  });

  it('should add a SINGLE journey on /journeys POST', function(done) {
    chai_module.request('http://localhost:3000')
      .post('/journeys')
      .set('content-type', 'application/json')
      .send({"composition"  : [{"entityid":"1700010272","type":"container"}, {"entityid":"101207201", "type":"palette"},{"entityid":"10072202", "type":"box"},{"entityid":"100171203", "type":"product"},{"entityid":"1011171004", "type":"product" }]})
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  it('  should list a SINGLE journey on /journeys/<id>', function(done) {
    chai_module.request('http://localhost:3000')
      .get('/journey/42')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });


   it('should update a SINGLE journey on /journeys/<id>',   function(done) {
        chai_module.request('http://localhost:3000')
      .put('/journey/41')
      .set('content-type', 'application/json')
      .send({"composition":  [{"entityid":"104001042","type":"container"}, {"entityid":"1004011", "type":"palette"},{"entityid":"1540002", "type":"box"},{"entityid":"1054003", "type":"product"},{"entityid":"1045004", "type":"product" }]})
      .end(function(err, res){
        res.should.have.status(200);
      done();
      });
  });   


  it('should delete a SINGLE journey on /journey/<id> DELETE', function(done) {
    chai_module.request('http://localhost:3000')
      .delete('/journey/43')
      .end(function(err, res){
        res.should.have.status(200);
         done();
      });
  });

 