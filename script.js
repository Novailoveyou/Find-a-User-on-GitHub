$(document).ready(() => {
  let username;
  $('#searchUser').on('keyup', (e) => {
    username = e.target.value;

    // Make request to GitHub
    $.ajax({
      url: `https://api.github.com/users/${username}`,
      data: {
        client_id: '6e030cb9a9baf321296e',
        client_secret: '7348281aab5b67bfaf16d18e537aa0ab83eaa5b7',
      },
    }).done((user) => {
      $.ajax({
        url: `https://api.github.com/users/${username}/repos`,
        data: {
          client_id: '6e030cb9a9baf321296e',
          client_secret: '7348281aab5b67bfaf16d18e537aa0ab83eaa5b7',
          sort: 'created: asc',
          per_page: 5,
        },
      }).done((repos) => {
        $.each(repos, (index, repo) => {
          $('#repos').append(`
          <div class="card bg-light mt-3">
            <div class="card-body">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${
            repo.description !== null ? repo.description : 'Empty Description'
          }
                </div>
                <div class="col-md-3">
                  <span class="badge badge-success">Forks: ${
                    repo.forks_count
                  }</span>
                  <span class="badge badge-info">Watchers: ${
                    repo.watchers_count
                  }</span>
                  <span class="badge badge-warning">Stars: ${
                    repo.stargazers_count
                  }</span>
                </div>
                <div class="col-md-2">
                  <a href="${
                    repo.html_url
                  }" target="_blank" rel="noopener noreferrer" class="btn btn-dark">Repo Page</a>
                </div>
              </div>
            </div>
          </div>
          `);
        });
      });
      $('#profile').html(`
        <div class="card">
          <div class="card-header">
            ${user.name}
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <img class="img-thumbnail" src="${user.avatar_url}" />
                <a class="btn btn-primary btn-block mt-2" href="${
                  user.html_url
                }" target="_blank" rel="noopener noreferrer">View Profile</a>
              </div>
              <div class="col-md-9">
                <span class="badge badge-info">Public Repos: ${
                  user.public_repos
                }</span>
                <span class="badge badge-success">Public Gists: ${
                  user.public_gists
                }</span>
                <span class="badge badge-warning">Followers: ${
                  user.followers
                }</span>
                <span class="badge badge-danger">Following: ${
                  user.following
                }</span>

                <ul class="list-group mt-3">
                  <li class="list-group-item">Company: ${
                    user.company === null ? 'No Company' : user.company
                  }</li>
                  <li class="list-group-item">Website/blog: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member Since: ${
                    user.created_at
                  }</li>
                </ul>
              </div>
            </div>
            <h3 class="page-header mt-4">Latest Repos</h3>
            <div id="repos"></div>
          </div>
        </div>
      `);
    });
  });
});
