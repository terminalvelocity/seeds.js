//module.exports = {
//  apianalytics: {
//    /**
//     * The types of requests to log
//     * (e.g. ["get /foo/bar", "post /foo", "/*"])
//     * Defaults to all routes.
//     */
//    routesToLog: [
//      '/*'
//    ],
//
//    /**
//     * Parameters which should NEVER be logged
//     * (e.g. "password")
//     * If seen, they will be replaced with "*PROTECTED*"
//     */
//    dontLogParams: ['password', 'token'],
//
//    // When request starts
//    onRequest: function onRequest(log, req, res) {
//      // Defaults to doing nothing
//    },
//
//    // When request is done
//    onResponse: function onResponse(log, req, res) {
//      // Defaults to logging request metadata to the console in a vaguely attractive way
//    }
//  }
//};