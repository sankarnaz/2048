var displayArray=[];
var numberArray=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var curArray=[0,0,0,0];
var winPoint=2048;
var curHigh=0;
var isNewGame=true;
var ifMoved=false;
function moveNumbers()
{
    var flagPoint=0;
    for(var i=0;i<4;i++)
    {
        if(curArray[i]!==0)
        {
            curArray[flagPoint]=curArray[i];
            if(flagPoint!==i)curArray[i]=0;
            flagPoint++;
        }
    }
}
function addNumbers()
{
    for(var i=0;i<3;i++)
    {
        if(curArray[i]!==0 && curArray[i]===curArray[i+1])
        {
            curArray[i]+=curArray[i+1];
            curArray[i+1]=0;
            if(curHigh<curArray[i])
            {
               curHigh=curArray[i] ;
               if(curHigh===winPoint)
               {
                   document.getElementById("main").innerHTML ="YOU WON!! \n Refresh Page To Start New Game;";
                   alert("YOU WON");
               }
            }
            i++;
        }
    }
}
function process()
{
    moveNumbers();
    addNumbers();
    moveNumbers();
    ifMoved=true;   
}
function upArrow()
{
for(var c=0;c<4;c++)
    {
    for(var r=0;r<4;r++ )
    curArray[r]=numberArray[r][c];
    process();
    for(var r=0;r<4;r++ )
        numberArray[r][c]=curArray[r];
    curArray=[0,0,0,0];
    }
}
function downArrow()
{
for(var c=0;c<4;c++)
    {
    var t=0;
    for(var r=3;r>=0;r--)
    {
    curArray[t]=numberArray[r][c];
    t++;
    }
    process();
    t=0;
    for(var r=3;r>=0;r--)
    {
    numberArray[r][c]=curArray[t];
    t++;
    }
    curArray=[0,0,0,0];
    }
}
function rightArrow()
{
for(var r=0;r<4;r++)
    {
    var t=0;
    for(var c=3;c>=0;c--)
    {
    curArray[t]=numberArray[r][c];
    t++;
    }
    process();
    t=0;
    for(var c=3;c>=0;c--)
    {
    numberArray[r][c]=curArray[t];
    t++;
    }
    curArray=[0,0,0,0];
    }
}

function leftArrow()
{
for(var c=0;c<4;c++)
    {
    for(var r=0;r<4;r++ )
    curArray[r]=numberArray[c][r];
    process();
    for(var r=0;r<4;r++ )
    numberArray[c][r]=curArray[r];
    curArray=[0,0,0,0];
    }
}
function doNothing(event)
{
if(isNewGame)
{
	var x=event.which;
	if(x===38) upArrow();
	else if(x===37) leftArrow();
	else if(x===39) rightArrow();
	else if(x===40)  downArrow();
	if(isEmpty()) 
	{
    		fillRandom();
	}
	else 	
	{
      		isNewGame=checkIfMoveAvailable();
	}
	myDisplay();
	ifMoved=false;
}
}
function checkIfMoveAvailable()
{
    var tempArray=JSON.parse(JSON.stringify(numberArray));
    upArrow();
    leftArrow();
    rightArrow();
    downArrow();
    if(tempArray.toString().localeCompare(numberArray.toString())!==0)
    {
        numberArray=tempArray;
        return true;
    }
    document.getElementById("main").innerHTML ="Game Over!! \n Refresh Page To Start New Game;";
    isNewGame=false;
    alert("GAME OVER!!");
}
function isEmpty()
{
for(var i=0;i<4;i++)
	{
	for(var j=0;j<4;j++)
		{
		if(numberArray[i][j]===0)
			return true;
		}
	}
return false;
}

function fillRandom()
{
if(!ifMoved) return;
var fillNum=[2,4];
var r=Math.floor(Math.random() * 4);
var c=Math.floor(Math.random() * 4);
if(numberArray[r][c]===0)
	{
	numberArray[r][c]=fillNum[(r+c)%2];
	return;
	}
fillRandom();
}

function initDisplay()
{
    var myBoard=document.getElementById('myBoard');
    for(var i=0;i<4;i++)
    {
        displayArray[i]=[];
        for(var j=0;j<4;j++)
        {
            var tt=document.createElement('div');
            tt.setAttribute("class","floating-box color_0");
            myBoard.appendChild(tt);
            displayArray[i][j]=tt;
        }
        myBoard.appendChild(document.createElement('br'));
    }
    
}

function myDisplay()
{
for(var i=0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        {
            var text=(numberArray[i][j]!==0)?numberArray[i][j]:"";
            displayArray[i][j].innerHTML=text;
            displayArray[i][j].setAttribute("class","floating-box color_"+numberArray[i][j]);
        }
    }

}
