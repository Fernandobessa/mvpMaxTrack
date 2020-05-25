import React, { useState, useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {getMooviesByName, getPerson,getTvDetail} from './MoovieActions'
import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';
import './MovieStyle.css';

export default function (){
    useEffect(
        ()=>dispach(getMooviesByName(type,query)),[]
      ); 
    const moovies = useSelector(state=> state.moovie.listMoovie);
    const person = useSelector(state=> state.moovie.person);
    const tv = useSelector(state=> state.moovie.tv);
    const dispach = useDispatch();
    const [isOpen, setIsOpen] = React.useState(false);
    const [valuesModal,setValuesModal] = useState([])
    //set defoult values.
    const [type,setType] = useState('movie')
    const [flagType,setFlagType] = useState('movie')
    const [query,setQuery] =useState('a') 
    const showModal = () => {
      setIsOpen(true);
    };
    const hideModal = () => {
      setIsOpen(false);
    };


    function renderModal(moovieObject){
        setValuesModal(...valuesModal,moovieObject)
        valuesModal?showModal():null
    } 
    function getMooviePath(moovie){
        switch (flagType) {
            case 'movie':
                if(moovie.poster_path !==null){
                    return "https://image.tmdb.org/t/p/w500"+moovie.poster_path
                }else{return "https://kbimages.dreamhosters.com/images/Site_Not_Found_Dreambot.fw.png"}
            case 'person':
                if(moovie.profile_path !==null){
                    return "https://image.tmdb.org/t/p/w500"+moovie.profile_path
                }else{return "https://kbimages.dreamhosters.com/images/Site_Not_Found_Dreambot.fw.png"}
            case 'tv':
                if(moovie.poster_path !==null){
                     return "https://image.tmdb.org/t/p/w500"+moovie.poster_path
                }else{return "https://kbimages.dreamhosters.com/images/Site_Not_Found_Dreambot.fw.png"}        
        }
    }
    function getTitle(movie,control){
        console.log(control)
        switch (flagType){
            case'movie':
                return <p className={control === 0 ? 'textModalTitle' : 'textPosterTitle' }><b>Title:</b> {movie.original_title?movie.original_title:null} </p>; 
            case'person':
                return <p className={control === 0 ? 'textModalTitle' : 'textPosterTitle' }><b>Name:</b> {movie.name?movie.name:null} </p>;     
            case'tv':
                return <p className={control === 0 ? 'textModalTitle' : 'textPosterTitle' }><b>Name:</b> {movie.name?movie.name:null} </p>;
         }
    }
    function getDescription(movie){
        switch (flagType){
            case'movie':
                return <p className="textPosterTitle"><b>Description:</b> {movie.overview?movie.overview:null} </p>; 
            case'person':
                return <p className="textPosterTitle"><b>popularity:</b> {movie.popularity?movie.popularity:null} </p>;     
            case'tv':
                return <p className="textPosterTitle"><b>Description:</b> {movie.overview?movie.overview:null} </p>;
         }
    }
    
    function getLastJob(jobs){
        if(jobs){
        let job = jobs[0];
        jobs.map((item)=>{
            item.release_date < jobs.release_date
            job = item.original_title
        })
         return <p className="textBody"><b>Last Job:</b> {job}</p>
         }else{return null}
       
        
    }
    function getPersonAge(valuesModal){
        if(valuesModal.id){
            if(!person.id){
                dispach(getPerson(valuesModal.id))
            }else if (person.id !== valuesModal.id){
                dispach(getPerson(valuesModal.id))
            }
         if(person.deathday){
             const deathdayYear = new Date(person.deathday).getFullYear()
             const birthdayYear = new Date(person.birthday).getFullYear()
             return <p className="textBody"><b>Age:</b> {deathdayYear-birthdayYear}</p>
         }
         else {
             const birthdayYear = new Date(person.birthday).getFullYear()
             const currentYear = new Date().getFullYear()
             return <p className="textBody"><b>Age:</b> {currentYear-birthdayYear}</p>
         }
        }
    }
    function getTv(valuesModal){
        let tvHtml = []
        if(valuesModal.id){
            if(!tv.id){
                dispach(getTvDetail(valuesModal.id))
            }
            else if (tv.id !== valuesModal.id){
                dispach(getTvDetail(valuesModal.id))
            }
            tvHtml.push(<p className="textBody" key="1"><b>Release Date:</b> {tv.first_air_date}</p>)
            tvHtml.push(<p className="textBody" key="2"><b>Seasons:</b> {tv.number_of_seasons}</p>)
            return tvHtml
        }
    }
    function changeMoovies(){
        dispach(getMooviesByName(type,query))
        setFlagType(type)
    }

      
      
    return (
        <div className="row">
            <div className="filterStyle">
                <img className="logo"src="https://static.netify.ai/logos/t/m/d/tmdb/icon.png?v=1"></img>
                <input placeholder="Enther the query" onChange={(e)=>setQuery(e.target.value)}className="input" type='text'/>  
                <select defaultValue="movie" className="select" onChange={(e)=>setType(e.target.value)} >
                    <option value="movie">Movie</option>
                    <option value="tv">Tv</option>
                    <option value="person">Person</option>
                </select>
                <button onClick={()=>changeMoovies()}className="btnSearch">Pesquisar</button>
            </div>
           {moovies.results? moovies.results.map( moovie => 
           <div  className="column" key={moovie.id}>
               <img onClick={()=>renderModal(moovie)} className="posterStyle" src={getMooviePath(moovie)}></img>
                {getTitle(moovie,1)}
                {getDescription(moovie)}
           </div>):null}
        <Modal show={isOpen} onHide={hideModal}>
             <Modal.Header>
                < Modal.Title>{getTitle(valuesModal,0)}</Modal.Title>
            </Modal.Header>
        {flagType=='movie'?
            <Modal.Body>
                <p><b>Release date:</b> {valuesModal?valuesModal.release_date:''}</p>
                <p><b>Avarage:</b> {valuesModal?valuesModal.vote_average:''}</p>
            </Modal.Body>: 
        flagType=='person'?
            <Modal.Body>
                {getPersonAge(valuesModal)}
                {getLastJob(valuesModal.known_for?valuesModal.known_for:null)}
            </Modal.Body>:
        flagType=='tv'?
            <Modal.Body>
                {getTv(valuesModal)}
            </Modal.Body>:null}
        <Modal.Footer>
            <button onClick={hideModal}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </div>  
    );
}