$(document).ready(function(){
    
    $("#vb-id").click(function(){
        window.location.href='Vb.html';
        
    });
    $("#java-id").click(function(){
        window.location.href='Java.html';
        
    });
    $("#html-id").click(function(){
        window.location.href='Html5.html';
        
    });
    $("#css-id").click(function(){
        window.location.href='Css.html';
        
    });
    $("#js-id").click(function(){
        window.location.href='Js.html';
        
    });
     $("#python-id").click(function(){
        window.location.href='Python.html';
        
    });
    
    // $("#nav-title").click(function(){
    //     window.location.href='index.html';
       
    // });
    
    
    
     $("#netbeans-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('https://netbeans.org/downloads/');
        
    });
    
    $("#scenebuilder-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('http://www.oracle.com/technetwork/java/javafxscenebuilder-1x-archive-2199384.html');
        
    });
    
     $("#eclipse-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('http://www.eclipse.org/downloads/eclipse-packages/');
        
    });
    
    $("#intellij-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('https://www.jetbrains.com/idea/download/#section=windows');
        
    });
    
    $("#bluej-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('https://www.bluej.org/');
        
    });
    
    $("#jdev-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('http://www.oracle.com/technetwork/developer-tools/jdev/downloads/index.html');
        
    });
    
     $("#androidstudio-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('https://developer.android.com/studio/index.html');
        
    });
    
    $("#sublime-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('https://www.sublimetext.com/3');
        
    });
    
    $("#webstorm-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('https://www.jetbrains.com/webstorm/download/#section=windows');
        
    });
    
    $("#notepad-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('https://notepad-plus-plus.org/download/v7.3.3.html');
        
    });
    
    $("#atom-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('https://atom.io/');
        
    });
    
    $("#icecoder-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('https://icecoder.net/downloads');
        
    });
    
    $("#c9-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('https://c9.io/?redirect=0');
        
    });
    
    $("#pyidle-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('https://www.python.org/downloads/');
        
    });
    
    $("#pycharm-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('https://www.jetbrains.com/pycharm/');
        
    });
    
    $("#komodo-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('https://www.activestate.com/komodo-ide/downloads/ide');
        
    });
    
    $("#spyder-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('https://github.com/spyder-ide');
        
    });
    
    $("#geany-id").click(function(){
        // window.location.href='https://netbeans.org/downloads/';
        window.open('https://www.geany.org/Download/Releases');
        
    });
    
    
    
    $('#sidebar-button').click(function(){
      
      $(this).find('#sidebar-icon').toggleClass('fa fa-angle-double-right');
      $(this).find('#sidebar-icon').toggleClass('fa fa-angle-double-left');
      

      if(show){
        $('#mySidebar').removeClass('right-animation');
        $('#mySidebar').toggleClass('left-animation');
        show = false;

      }else{
        $('#mySidebar').removeClass('left-animation');
        $('#mySidebar').toggleClass('right-animation');
        show = true;
      }
      
    });
    
    
    
    $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      hideNavDropdown();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 44
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });
    // $("#html-id").click(function(){
    //     window.location.href='html5.html';
    //
    // });
    // $("#js-id").click(function(){
    //     window.location.href='js.html';
    //
    // });
    // $("#css-id").click(function(){
    //     window.location.href='css.html';
    //
    // });
    // $("#python-id").click(function(){
    //     window.location.href='python.html';
    //
    // });
    // var boxInitialTop = $("#cont1").offset().top;
    // var imgTop = parseInt(boxInitialTop);
    // $(window).scroll(function() {
    //     if ($(window).scrollTop() > boxInitialTop) {
    //         $("#cont1").css({
    //         position: 'fixed',
    //         top: '0px'
    //         });
    //     } else {
    //         $("#cont1").css({
    //         position: 'inherit',
    //         top: imgTop + 'px'    // add this to "reset" the top to it's original (that you set in your css)
    //         });
    //     }
    // });
    
    $( window ).resize(function() {
        
    });
    
});

function hideNavDropdown(){
  var x = document.getElementById("nav-dropdown");
  x.className = x.className.replace(" w3-show", "");
        
}

function myFunction() {
  var x = document.getElementById("nav-dropdown");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  }else{
    x.className = x.className.replace(" w3-show", "");
  }
}

function clickME(){
  // var x = document.getElementById("btnD");
  document.getElementById("btnD").style = "display:blocks";
  alert("aibgawigb")
}

var show = true;