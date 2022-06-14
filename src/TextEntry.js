import React from "react"
import './TextEntry.css'
import str from "./stories/story1";
let $=require('jquery')
function isprint(char) {
    if(char.length === 1)
    return /^[a-zA-Z0-9!"#$%&'()*+,./:;<=>?@[\] ^_`{|}~-]$/.test(char);
    else
    return ["Enter"].indexOf(char)>-1
};
var txt =str.data
export default class TextEntry extends React.Component
{
    constructor(props){
        super(props)
        this.status={cind:-1,right:0,total:0,started:false};
        this.handleKeyPress=this.handleKeyPress.bind(this)
        this.tick=props.tick
        this.handleStatus=props.handleStatus
    }

    componentDidMount(){
        //setInterval()
    }
    handleKeyPress(event){
        event.preventDefault()
        event.stopPropagation()
        if(event.key === 'Backspace')
        {
            if(this.status.cind>=0){
                $(".textBox span").eq(this.status.cind).removeClass("rightEntry")
            .removeClass("wrongEntry").next().removeClass("currentEntry")

            this.status.cind--
            }
        }else if(isprint(event.key)){
            this.status.total++;
            this.status.cind++;
            if(this.status.cind === txt.length)
             this.status.cind=0
            let letter = $(".textBox span").eq(this.status.cind).removeClass("currentEntry");
            if(letter.text()===event.key){
                letter.addClass("rightEntry")
                this.status.right++
            }else{
            letter.addClass("wrongEntry")
            }
        }
        $(".textBox span").eq(this.status.cind+1).addClass("currentEntry")
        this.status.started=true
        this.handleStatus(this.status)
    }
    render(){

        return (
            <>
            <div tabIndex={-1} className="textBox" onKeyDown={this.handleKeyPress}>
                {Array.from(txt).map((a,ind)=><span className="initialText" key={ind}>{a}</span>)}
            </div>
            </>
        );
    }
}