import { Component, inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieCategoryComponent } from '../../components/movie-category/movie-category.component';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../types/movies';
import { tmdbConfig } from '../../constants/config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule,HeaderComponent,MovieCategoryComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent {
  movieService = inject(MoviesService);
  tmdbConfig = tmdbConfig;
  UpcomingMovies:Movie[]=[];
  nowPlayingMovies:Movie[]=[];
  topRatedMovies:Movie[]=[];
  popularMovies:Movie[]=[];
  bannerMovie!:Movie
  public domSanitise = inject(DomSanitizer)

  ngOnInit(){
    this.movieService.getPopularMovies().subscribe((result:any)=>{
      console.log(result); 
      this.popularMovies = result.results
      this.bannerMovie = this.popularMovies[0]
      this.movieService.getMovieVideo(this.bannerMovie.id).subscribe((res:any)=>{
        this.bannerMovie.videoKey=res.results.find((x:any)=>x.site='YouTube').key
        console.log(this.bannerMovie);

      })
    })
    this.movieService.getUpcomingMovies().subscribe((result:any)=>{
      console.log(result); 
      this.UpcomingMovies = result.results
    })
    this.movieService.getNowPlayingMovies().subscribe((result:any)=>{
      console.log(result); 
      this.nowPlayingMovies = result.results
    })
    this.movieService.getTopRatedMovies().subscribe((result:any)=>{
      console.log(result); 
      this.topRatedMovies = result.results
    })
  }
}
