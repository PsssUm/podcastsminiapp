import moment from 'moment';
import 'moment/locale/ru'
import frederik_chopin from '../resources/music/frederik_chopin.mp3'
import lineage_album from '../resources/music/lineage.mp3'
import standart_album from '../resources/icons/standart_album.png'
export const getEpmtyModel = () => {
    var podcast = {
        title : "",
        description : "",
        duration : "",
        imageSrc : standart_album,
        audioFile : undefined,
        timecodes : [],
        isBadContent : false,
        author : "Матвей Правосудов",
        isExport : false,
        isTrailer : true,
        postText : "",
    }
    //testing data
    // var podcast = {
    //     title : "Подкаст прекрасных людей",
    //     description : "Подкаст, который рассказывает про то, как много в мире прекрасных вещей, которые можно совершить, а также сколько людей, которые могут помочь вам в реализации ваших заветных мечт.",
    //     duration : "02:54",
    //     imageSrc : standart_album,
    //     author : "Матвей Правосудов",
    //     audioFile : undefined,
    //     timecodes : [{title : "Первый",time : "01:10"},{title : "Второй",time : "01:44"},{title : "Третий",time : "00:10"},{title : "Четвертый",time : "02:64"}],
    //     isBadContent : false,
    //     isExport : false,
    //     isTrailer : true,
    //     postText : "",
    // }
     return podcast
}
export const getEpmtyTimecodeModel = (time) => {
    var timecode = {
        title : "",
        time : time
    }
    return timecode
}
export const getMusicList = () => {
    var lineage = {
        title : "Lineage",
        artist : "The Hunter Village",
        album : "https://sun9-43.userapi.com/jEQB8fv9j19SIpbHKOsUANclKp6AyTs566i0AA/syjMBeiKHIQ.jpg",
        duration : "02:17",
        audio : lineage_album
    }
    var chopin = {
        title : "Мелодия любви",
        artist : "Frederic Chopin",
        album : "https://sun9-46.userapi.com/Vm-bGQsxis2C7ICLfmAtTB7KGCzvx6-Ip8kOoQ/3V_QLRDzPw4.jpg",
        duration : "02:43",
        audio : frederik_chopin
    }
    return [lineage, chopin]
}
export const getDatesCount = (finishDate) => {
    const currentDate = new Date().getTime() / 1000
    var difference = 0
    if (currentDate < finishDate){
        difference = (finishDate - currentDate) / 86400
    } else {
        difference = 0
    }
    return Math.round(difference)
}
export const dateToString = (date) => {
    return moment.unix(date).format("DD MMMM")
}
export const convertSecondsToTime = (secCount) => {
    var sec_num = parseInt(secCount, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}