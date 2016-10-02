module.exports = function (gh) {

    if (gh.data.payload.action === 'closed' && gh.data.payload.pull_request.merged) {

        var git_refs_url = gh.data.payload.repository.git_refs_url,
            branch_name  = gh.data.payload.pull_request.head.ref,
            constructed_url = git_refs_url.replace('{/sha}', '/heads/' + branch_name);

        gh.modules.authRequest.del(constructed_url, function branchDeleted(err, httpResponse, body) {
            if (err) {
                gh.process.fail('Could not send POST request: ' + err);
            }
            else {
                gh.process.succeed('The "' + branch_name + '" branch was successfully deleted after merging #' + gh.data.payload.pull_request.number);
            }
        });

    }
    else {
        gh.process.succeed('Nothing to do here.');
    }
};