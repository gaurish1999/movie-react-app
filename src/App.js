import './App.css';
import axios from 'axios';

var showTitle, showGenre;

function getMovies() {
  showTitle = document.getElementById('showtitle').value;
  showGenre = document.getElementById('showgenre').value;

   const options = {
    method: 'GET',
    url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
    params: {type: 'get-' + showGenre + '-by-title', title: showTitle},
    headers: {
      'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
      'x-rapidapi-key': '2ca6605e14mshaac47e500e2ca66p1b0e53jsn6c2788762d8e'
    }
  };
  
   axios.request(options)
   .then(response => {
      console.log(response.data);
      
      // if(showGenre == 'movies')
      //   document.getElementById('showmovies').innerText = JSON.stringify(response.data.movie_results[0].title);
      // else
      // document.getElementById('showmovies').innerText = JSON.stringify(response.data.tv_results[1].title);

      showIt((response.data));

      function showIt(mess){
        // console.log(mess.movie_results[0].year);
        var getit = document.getElementById('addit');
        var row = new Array();

        if(showGenre == 'movies'){
          for(var i = 0; i < mess.movie_results.length; i++){
            // var row = console.log(i)
            
            row[i] = `<tr>
                         <td>${mess.movie_results[i].year}</td>
                         <td>${mess.movie_results[i].title}</td>
                         <td>${mess.movie_results[i].imdb_id}</td>
                       </tr>`
            }
        }
        else{
          for(var i = 0; i < mess.tv_results.length; i++){
            row[i] = `<tr>
                        <td>${mess.tv_results[i].release_date}</td>
                        <td>${mess.tv_results[i].title}</td>
                        <td>${mess.tv_results[i].imdb_id}</td>
                      </tr>`
          }
        }
        
        getit.innerHTML = row;
      }
      
      // document.getElementById('showmovies').innerText = JSON.stringify(response.data.movie_results[0].title);
      
  });
}

export default function App() {
  
  return (
    <div className="App">
       <input type="text" id='showtitle'/>
        <select id='showgenre'>
          <option value='movies'>Movies</option>
          <option value='shows'>TV Shows</option>
        </select>

        <button onClick={getMovies}>Search</button>

        {/* <div id='showmovies'></div> */}
        <table border='1'>
          <thead>
            <tr>
              <th>Year</th>
              <th>Title</th>
              <th>imdb ID</th>
            </tr>
          </thead>

          <tbody id='addit'>
            
          </tbody>
        </table>

    </div>
  );
}