/* EMPTY PROPERTY STATE */

.empty-properties{
  grid-column:1/-1;
  min-height:300px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
  padding:50px 25px;
  background:#fff;
  border:1px dashed #CBD3DC;
}

.empty-icon{
  width:58px;
  height:58px;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom:20px;
  border-radius:50%;
  background:var(--sand);
  color:var(--navy);
  font-size:30px;
}

.empty-properties h3{
  color:var(--navy);
  font-size:24px;
  margin-bottom:10px;
}

.empty-properties p{
  max-width:500px;
  color:var(--slate);
  font-size:14px;
  margin-bottom:25px;
}

.empty-properties .btn{
  background:var(--navy);
  color:#fff;
}

.empty-properties .btn:hover{
  background:var(--orange);
}

@media(max-width:750px){

  .empty-properties{
    min-height:280px;
    padding:40px 20px;
  }

  .empty-properties h3{
    font-size:21px;
  }

}
