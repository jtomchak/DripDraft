var app = require('../app');
var expect = require('chai').expect;
var should = require('chai').should();
var request = require('superTest');
var logger = require('../util/logger');


describe('DRAFT', function () {

    it('should get all the users drafts', function (done) {
        request(app)
            .get('/api/drafts')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + global.token)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                (res.body).should.be.a('array');
                done();
            })
    });

    it('should be able to POST new draft of less than 140 characters', function(done) {
        request(app)
            .post('/api/drafts')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer ' + global.token)
            .type('form')
            .send({
               title:'Bananna Pants!!',
               text: random140Words 
            })
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            })
    });

    it('should NOT be able to POST new draft of more than 140 characters', function(done) {
        request(app)
            .post('/api/drafts')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer ' + global.token)
            .type('form')
            .send({
               title:'Bananna Pants!!',
               text: random141Words 
            })
            .expect(403)
            .end(function (err, res) {
                should.not.exist(err);
                const payload = res.body;
                (payload).should.be.a('object'); 
                (payload.message).should.equal('Draft is over the word limit of 140')
                done();
            })
    });
});


const random140Words = `Lorem ipsum dolor sit amet, ne est nostrud ceteros disputationi.Vix 
ut aliquip philosophia, modo honestatis ut eam. Pro in pertinacia reformidans. Ius ad 
commune praesent, pro ad nibh voluptatum reprimique.Ne duo stet vocent, has ex soleat tempor 
molestiae, cum ferri illud nihil in. Id vim accusam prodesset, ex cum vidit ullum. Sit cu 
splendide scriptorem cotidieque, eripuit salutandi intellegat his no, ex omnes partem fierent eum.
Dissentiet consectetuer at pri, ne meis erant duo. Nulla vituperata ad nam, natum vocibus 
vivendo ex mei.Veniam ubique inciderint sit ex, ex eam mundi aeterno, audire patrioque usu ad. 
Reque falli mnesarchum et his. Ad melius ponderum his, omnium principes eam cu. Ex volumus 
appareat adipisci vim. Nulla iudicabit qui ea, discere offendit per no. Ei his pertinax 
suavitate constituam. Ea vix putant quaestio. An latine similique usu, cu wisi detracto 
Ad melius ponderum his.`

const random141Words = `Lorem ipsum dolor sit amet, ne est nostrud ceteros disputationi.Vix 
ut aliquip philosophia, modo honestatis ut eam. Pro in pertinacia reformidans. Ius ad 
commune praesent, pro ad nibh voluptatum reprimique.Ne duo stet vocent, has ex soleat tempor 
molestiae, cum ferri illud nihil in. Id vim accusam prodesset, ex cum vidit ullum. Sit cu 
splendide scriptorem cotidieque, eripuit salutandi intellegat his no, ex omnes partem fierent eum.
Dissentiet consectetuer at pri, ne meis erant duo. Nulla vituperata ad nam, natum vocibus 
vivendo ex mei.Veniam ubique inciderint sit ex, ex eam mundi aeterno, audire patrioque usu ad. 
Reque falli mnesarchum et his. Ad melius ponderum his, omnium principes eam cu. Ex volumus 
appareat adipisci vim. Nulla iudicabit qui ea, discere offendit per no. Ei his pertinax 
suavitate constituam. Ea vix putant quaestio. An latine similique usu, cu wisi detracto 
Ad melius ponderum his volumus.`