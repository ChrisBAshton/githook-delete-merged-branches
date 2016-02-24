module.exports = function (data, process) {

    if (data.payload.action === 'closed' && data.payload.pull_request.merged) {

        var git_refs_url = data.payload.repository.git_refs_url,
            branch_name  = data.payload.pull_request.head.ref,
            constructed_url = git_refs_url.replace('{/sha}', '/heads/' + branch_name),
            options = {
            url: constructed_url,
            headers: {
                'Content-Type':  'application/json',
                'User-Agent':    'delete-merged-branches',
                'Authorization': 'token ' + data.access_token
            }
        };

        request.del(options, function branchDeleted(err, httpResponse, body) {
            if (err) {
                process.fail('Could not send POST request: ' + err);
            }
            else {
                process.succeed('The "' + branch_name + '" branch was successfully deleted after merging #' + data.payload.pull_request.number);
            }
        });

    }
    else {
        process.succeed('Nothing to do here.');
    }
};