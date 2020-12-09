
const GameBoardGenerator = (function() {
    let usedImages = [];

    function generateGuid() {
        var result, i, j;
        result = '';
        for(j=0; j<32; j++) {
          if( j === 8 || j === 12 || j === 16 || j === 20)
            result = result + '-';
          i = Math.floor(Math.random()*16).toString(16).toUpperCase();
          result = result + i;
        }
        return result;
      }

    function getRandomImage(){
        var index = Math.floor(Math.random() * Math.floor(49));
        while(usedImages.includes(index)){
            index = Math.floor(Math.random() * Math.floor(49));
        }

        usedImages.push(index);
        return 'img/' + index + '.png';
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
  
    function generateGameBoard(numberOfTiles, includeBomb) {    
        let _tiles = [];
    
        let first = true;
        let prevImgSrc;
        let prevGuid;

        for(let i = 0; i < numberOfTiles; i++){
            let newTile = {
                id: i,
                isFlipped: false,
                imgSrc : (first ? getRandomImage() : prevImgSrc),
                matchGuid : (first ? generateGuid() : prevGuid),
                isBomb :  false
            }
            _tiles.push(newTile);
            prevImgSrc = newTile.imgSrc;
            prevGuid = newTile.matchGuid;
            first = !first;
        }

        if(includeBomb){
            let bomb = {
                id : numberOfTiles,
                isBomb : true,
                imgSrc : 'img/bomb.png'
            }
            _tiles.push(bomb);
            _tiles.push(bomb);
        }
    
        let tiles = shuffle(_tiles);
        return tiles;
    }
  
    return {
      GenerateGameBoard: generateGameBoard
    };
  })(); 

  export default GameBoardGenerator;