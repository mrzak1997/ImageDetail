import { Component } from "react";
import Axios from "axios";

class searchBox extends Component{
    state = {
        searchText:null,
        wiki:[],
        images:[],
        language:"English"
    }
    // async componentDidMount(){
    //     const response = await Axios.get("https://api.unsplash.com/search/photos?page=1&query=iran&client_id=kOIigY9fssj_wy8V3DrQ0g4jngtE8_Ex8gNmGxw34t4");
    //    // console.log(response.data.results);
    //     this.setState({images:response.data.results});
    // }
    render(){
        const keys = Object.keys(this.state.wiki);
        const condition = this.state.wiki[keys[0]];
        const base_url = 'https://en.wikipedia.org/w/index.php?curid=';

        // console.log(condition)
        return(
            <>
                <div className="form-group">
                    <input type="text" name="" id="" className="form-control searchTextbox" onKeyDown={this.handleTextbox} placeholder="search something..."/>
                    <select className="selectpicker" data-width="fit" onChange={this.handleSelector} >
                        <option value="English">English</option>
                        <option value="Persian">persian</option>
                    </select>
                    <br />
                </div> 
                    {condition ? (
                        <>
                        <div className="mainBox" placeholder="MainBox">
                    <div className="row">
                            <img src={condition.thumbnail.source} alt={condition.title} className="img-fluid cover" /> 
                            <h2>{condition.title}</h2>
                            <p>{condition.extract}</p> 
                            <a href={base_url+condition.pageid}><button className="btn btn-success">More Details</button></a>
                            <div className="row similar_images">
                                <h3>Similar Images</h3>
                            {
                            this.state.images.map((image,index)=>(
                                <div className="col-12 col-lg-6 col-md-12 col-sm-12">
                                    <a href={image.link}><img src={image.thumbnail} alt={image.title} key={index} className="unsplash_img img-thumbnail mx-auto d-block"/> 
                                    <h6>{image.title}</h6></a>
                                </div>
                            ))
                            }
                            </div>
                            
                        </div>
                        </div>
                        </>
                            
                       ):("")
                    }
            </>
        )
    }
    handleSelector=(event)=>{
        this.setState({language:event.target.value});
        console.log(this.state.language);
    }
    handleTextbox=(event)=>{
        if(event.key==="Enter" && event.target.value !== ""){
            this.setState({images:[]});
            this.setState({searchText : event.target.value});

            if(this.checkimage(event.target.value)){
                console.log("google");
                this.googleLens(event.target.value);
            }else{
                console.log("wiki");

                this.wiki(event.target.value);
            }
            // this.getData();
            // 
            // console.log(this.state.searchText);
            
        }else if(event.key==="Enter" && event.target.value===""){
            alert("type something in TextBox!!!");
        }
    }
    checkimage=(imageUrl)=>{
        const https = "https://";
        const http = "http://";

        const isValidImageUrl = imageUrl.includes(https) ? imageUrl.includes(https) : (imageUrl.includes(http) ? true : false);
        
        return isValidImageUrl;
    }
    async googleLens(imageUrl){
        const url = "https://serpapi.com/search.json?engine=google_lens&url="+imageUrl+"&api_key=48cc4ace0dd75a29012e2434d479fc9996b11a62374a4a35b8bf40b742145fd0";
        const response = await Axios.get(url);
        
        let images_arr = []

        for(let i=0;i<5;i++){
            images_arr.push(response.data.visual_matches[i]);
        }
        this.setState({images:images_arr});
        
        console.log(response);
        console.log(this.state.images);
        console.log(response.data.visual_matches[0].title);
        
        this.wiki(this.getBestTitle(response.data.visual_matches[0].title));
    }
    getBestTitle=(string)=>{
        let changedString =string.split(' ').slice(0,2).join(' ');

        console.log(changedString);
        return changedString;
    }
    async wiki(value) {
        let url="";
        if(this.state.language==="Persian"){
            url = "https://fa.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts|pageimages&pithumbsize=400&origin=*&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+value+"";
        }else{
            url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts|pageimages&pithumbsize=400&origin=*&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+value+"";
        }
        const response = await Axios.get(url);

        this.setState({wiki:response.data.query.pages});
        // console.log(response.data.query.pages);
    }

    // async getData(){
    //     const response = await Axios.get("https://api.unsplash.com/search/photos?page=1&query="+this.state.searchText+"&client_id=lhUea4k5Z-lET3uobBfB5BGXbCGg82hTV_2jIL2xSPg");
    //     this.setState({images:response.data.results});
    //     // console.log(response.data.results);
    // }
}

export default searchBox;