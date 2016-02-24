module.exports = function (data, process) {

    if (data.payload.action === 'closed' && data.payload.pull_request.merged) {

        var git_refs_url = data.payload.repository.git_refs_url,
            constructed_url = git_refs_url.replace('{/sha}', '/heads/' + data.payload.pull_request.head.ref),
            options = {
            url: constructed_url,
            headers: {
                'Content-Type':  'application/json',
                'User-Agent':    'delete-merged-branches',
                'Authorization': 'token ' + data.access_token
            }
        };

        request.delete(options, function branchDeleted(err, httpResponse, body) {
            if (err) {
                process.fail('Could not send POST request: ' + err);
            }
            else {
                process.succeed('DELETE message successful. Response:' + body);
            }
        });

    }
    else {
        process.succeed('Nothing to do here.');
    }
};