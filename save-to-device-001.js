(function(){
  function setRecorderError(message){
    const box=document.getElementById('recError');
    if(!box) return;
    box.textContent=message;
    box.style.display='block';
  }

  function clearRecorderError(){
    const box=document.getElementById('recError');
    if(!box) return;
    box.textContent='';
    box.style.display='none';
  }

  function fallbackDownload(blob,filename){
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=filename;
    a.style.display='none';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),60000);
    return {mode:'download',filename};
  }

  async function robustSave(blob,filename){
    const ext=filename.toLowerCase().endsWith('.mp4')?'.mp4':'.webm';
    const cleanMime=ext==='.mp4'?'video/mp4':'video/webm';

    if(typeof window.showSaveFilePicker==='function'){
      try{
        const handle=await window.showSaveFilePicker({
          suggestedName:filename,
          types:[{
            description:'KNEWBIE recording',
            accept:{[cleanMime]:[ext]}
          }]
        });
        const writable=await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        return {mode:'picker',filename};
      }catch(err){
        if(err && err.name==='AbortError') throw err;
        console.warn('KNEWBIE save picker failed; using browser download fallback.',err);
      }
    }

    return fallbackDownload(blob,filename);
  }

  function filenameFor(blob){
    try{
      if(typeof recordingFilename==='function') return recordingFilename(blob);
    }catch(_){}
    const ext=(blob.type||'').includes('mp4')?'mp4':'webm';
    return 'KNEWBIE-recording-'+new Date().toISOString().slice(0,10)+'.'+ext;
  }

  function renderSavedNextStep(saved,savebtn){
    if(typeof statusIdx!=='undefined') statusIdx=2;
    if(typeof renderStatus==='function') renderStatus();

    savebtn.textContent='Save initiated';
    savebtn.disabled=true;

    const tg=document.getElementById('tgsection');
    if(!tg) return;

    const confirmLabel=(typeof ui==='function')
      ? ui('confirmSaved','Confirm saved and continue')
      : 'Confirm saved and continue';

    tg.innerHTML=
      '<div class="tgbox"><strong>'+saved.filename+'</strong><br>'+
      'Save/download started. Confirm that you can find the file on this device before continuing.</div>'+
      '<button class="cta" id="confirmSavedRecording">'+confirmLabel+'</button>';

    document.getElementById('confirmSavedRecording').addEventListener('click',function(){
      if(typeof statusIdx!=='undefined') statusIdx=3;
      if(typeof renderStatus==='function') renderStatus();

      savebtn.textContent='Saved';

      const telegramInstruction=(typeof ui==='function')
        ? ui('telegramInstruction','Send the saved recording to your Teacher through Telegram.')
        : 'Send the saved recording to your Teacher through Telegram.';
      const includeMessage=(typeof ui==='function')
        ? ui('includeMessage','Include this message')
        : 'Include this message';
      const markSentLabel=(typeof ui==='function')
        ? ui('markSent','Mark as sent')
        : 'Mark as sent';

      tg.innerHTML=
        '<div class="tgbox">'+telegramInstruction+' '+includeMessage+
        ': <strong>'+S.independent.telegramTag+'</strong>.</div>'+
        '<button class="cta" id="marksent">'+markSentLabel+'</button>';

      document.getElementById('marksent').addEventListener('click',function(){
        if(typeof statusIdx!=='undefined') statusIdx=5;
        if(typeof renderStatus==='function') renderStatus();

        if(typeof DB!=='undefined' && currentEmail && sessionMissionNum!=null){
          DB.assignments[currentEmail][sessionMissionNum].recordingStatus='student_marked_sent';
        }
        if(typeof notify==='function' && currentUser){
          notify('teacher@eslearning.test',currentUser.name+' submitted Mission '+sessionMissionNum+' recording for review.');
        }

        tg.innerHTML='';
        const complete=document.getElementById('completesection');
        if(complete){
          complete.innerHTML=
            '<div class="done-msg"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>'+
            '<p><strong>'+S.independent.completion+'</strong></p></div>';
        }
      });
    });
  }

  document.addEventListener('click',async function(event){
    const savebtn=event.target.closest && event.target.closest('#saveRecordingBtn');
    if(!savebtn) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    clearRecorderError();

    const preview=document.getElementById('recordPreview');
    const source=preview && (preview.currentSrc || preview.src);
    if(!source || !source.startsWith('blob:')){
      setRecorderError('No finished recording is available to save yet.');
      return;
    }

    const originalText=savebtn.textContent;
    savebtn.disabled=true;
    savebtn.textContent='Saving...';

    try{
      const response=await fetch(source);
      if(!response.ok) throw new Error('Could not read recording');
      const blob=await response.blob();
      const saved=await robustSave(blob,filenameFor(blob));
      renderSavedNextStep(saved,savebtn);
    }catch(err){
      savebtn.disabled=false;
      savebtn.textContent=originalText;
      if(err && err.name==='AbortError'){
        setRecorderError('Save was cancelled. Your recording is still available on this page.');
      }else{
        console.error(err);
        setRecorderError('KNEWBIE could not start the save/download. Please try again.');
      }
    }
  },true);
})();