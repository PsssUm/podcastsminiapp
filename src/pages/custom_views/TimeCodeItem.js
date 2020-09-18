import React from 'react';
import remove_circle_24 from '../../resources/icons/remove_circle_24.svg'
import { Input} from '@vkontakte/vkui';

class TimeCodeItem extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
            title : this.props.timecode.title,
            time : this.props.timecode.time,
        }
        this.titleChanged = this.titleChanged.bind(this);
        this.timeChanged = this.timeChanged.bind(this);
    }
    titleChanged(event){
        if (event){
            var value = event.target.value
            this.setState({title : value})
            this.props.onTimeCodeTitleChanged(value, this.props.index)
        }
    }
    timeChanged(event){
        if (event){
            var value = event.target.value
            this.setState({time : value})
            this.props.onTimeCodeTimeChanged(value, this.props.index)
        }
    }
    componentDidUpdate(prevProps){
        if (prevProps != this.props){
            this.setState({title : this.props.timecode.title,time : this.props.timecode.time})
        }
    }
   
    render() {
        return (
            <div className="timecode_item_container">
                <div onClick={() => this.props.onDeleteTimeCode(this.props.timecode)}>
                    <img className="remove_icon_timecode" src={remove_circle_24}/>
                </div>
                <Input className="timecode_name_input" onChange={this.titleChanged} value={this.state.title} type="text" placeholder="Название таймкода"/>
                <Input className="timecode_time_input" onChange={this.timeChanged} value={this.state.time} type="text" placeholder="Время"/>
            </div>
        );
    }
}
export default TimeCodeItem;