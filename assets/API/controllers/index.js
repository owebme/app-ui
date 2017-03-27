module.exports = function(){

    global.API = {
        resume: require('./resume')(),
        suggest: require('./suggest')()
    }

}
