import React from 'react';
import DayPicker from 'react-day-picker';
import { ActionSheet, ActionSheetItem, CellButton, Panel, View } from '@vkontakte/vkui';
class BottomSheetDialog extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        popout: null,
      }
      this.changeMusic = this.changeMusic.bind(this);
      this.onClose = this.onClose.bind(this);
      this.removeMusic = this.removeMusic.bind(this);
    }
  
    componentDidMount() {
      this.openBase();
    }
    onClose(){
      this.setState({ popout: null })
      this.props.onClose()
    }
    changeMusic() {
        this.setState({ popout: null });
        this.props.changeMusic()
    }
    removeMusic() {
        this.props.removeMusic()
    }
    
    openBase () {

      this.setState({ popout:
        <ActionSheet onClose={this.onClose}>
            <ActionSheetItem onClick={this.changeMusic} autoclose>
            Изменить музыку
            </ActionSheetItem>
            <ActionSheetItem style={{color : "#E64646"}} onClick={this.removeMusic} autoclose>
            Удалить музыку
            </ActionSheetItem>
           
            <ActionSheetItem onClick={this.onClose} autoclose mode="cancel">Отменить</ActionSheetItem>

        </ActionSheet>
      });
    }
  
  
    render() {
      return (
        <View popout={this.state.popout} activePanel="panel">
            <Panel id="actionSheet">
                
            </Panel>
        </View>

      )
    }
  }
  export default BottomSheetDialog;
