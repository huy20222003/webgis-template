function showResult(str) {
    const liveSearch = document.getElementById('livesearch');
  
    if (str.length === 0) {
      liveSearch.innerHTML = '';
      liveSearch.style.border = '0px';
      return;
    }
  
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        liveSearch.innerHTML = xmlhttp.responseText;
        liveSearch.style.border = '1px solid gray';
      }
    };
  
    xmlhttp.open('GET', `./php/live_search.php?loaidat=${str}`, true);
    xmlhttp.send();
  };
  