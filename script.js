const DATA = [
  {
    id: 1,
    ciudad: "Lima",
    nombre: "Residencial Miraflores",
    categoria: "Apartamento",
    precio_actual: 550000,
    precio_anterior: 600000,
    area: "120m²",
    habitaciones: 3,
    baños: 2,
    parqueaderos: 1,
    imagen: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/182445045.jpg?k=63e0ec623d98d2d90162d522f7c26471c69c7126ac88184e2cd7b2ad46f48cb4&o="
  },
  {
    id: 2,
    ciudad: "Lima",
    nombre: "Casa San Borja",
    categoria: "Casa",
    precio_actual: 750000,
    precio_anterior: 820000,
    area: "200m²",
    habitaciones: 4,
    baños: 3,
    parqueaderos: 2,
    imagen: "https://img.resemmedia.com/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTkxODNhLTQwOTUtNzUzOC1iY2VhLTVhOGUwMTU4YjI0Yi8wMTk5MTgzYy0xNDI5LTcwMDUtYmU4YS00MTUxYjM1OTgxODAuanBnIiwiYnJhbmQiOiJyZXNlbSIsImVkaXRzIjp7InJvdGF0ZSI6bnVsbCwicmVzaXplIjp7IndpZHRoIjo4NDAsImhlaWdodCI6NjMwLCJmaXQiOiJjb3ZlciJ9fX0="
  },
  {
    id: 3,
    ciudad: "Lima",
    nombre: "Terreno Surco",
    categoria: "Lote",
    precio_actual: 400000,
    precio_anterior: 450000,
    area: "150m²",
    habitaciones: 0,
    baños: 0,
    parqueaderos: 0,
    imagen: "https://bolsainmobiliaria.pe/storage/anuncios/OjQyFeCWmgjCdj2UAzQvUToQZoxlQIpwLUvXrALK.jpeg"
  }
];

function formatMoney(n){
  return n.toLocaleString('es-PE',{style:'currency',currency:'PEN',maximumFractionDigits:0});
}

const listEl = document.getElementById('list');
const searchEl = document.getElementById('search');
const categoryEl = document.getElementById('category');
const sortEl = document.getElementById('sort');

// Inicializar categorías
const cats = ['Todos',...new Set(DATA.map(d=>d.categoria))];
cats.forEach(c=>{
  const opt=document.createElement('option');opt.value=c;opt.textContent=c;
  categoryEl.appendChild(opt);
});

function render(items){
  listEl.innerHTML='';
  if(items.length===0){
    listEl.innerHTML='<div class="empty">No se encontraron propiedades.</div>';
    return;
  }
  items.forEach(item=>{
    const card=document.createElement('article');
    card.className='card';
    card.innerHTML=`
      <img class="media" src="${item.imagen}" alt="${item.nombre}">
      <div class="card-body">
        <h3>${item.nombre}</h3>
        <p class="muted">${item.ciudad} • ${item.categoria}</p>
        <div class="price">${formatMoney(item.precio_actual)}</div>
        <div class="old-price">${formatMoney(item.precio_anterior)}</div>
        <div class="details">
          🛏️ ${item.habitaciones} hab. &nbsp; | &nbsp; 🚿 ${item.baños} baños &nbsp; | &nbsp; 🚗 ${item.parqueaderos} parqueos
        </div>
      </div>
      <div class="card-footer">
        <button class="btn" onclick="alert('Contacto para ${item.nombre}')">Ver detalles</button>
      </div>
    `;
    listEl.appendChild(card);
  });
}

function applyFilters(){
  const q=searchEl.value.toLowerCase();
  const cat=categoryEl.value;
  const sort=sortEl.value;
  let items=DATA.filter(item=>{
    const matchCat=cat==='Todos'||item.categoria===cat;
    const matchQ=item.nombre.toLowerCase().includes(q)||item.ciudad.toLowerCase().includes(q);
    return matchCat && matchQ;
  });
  if(sort==='precio-asc') items.sort((a,b)=>a.precio_actual-b.precio_actual);
  if(sort==='precio-desc') items.sort((a,b)=>b.precio_actual-a.precio_actual);
  render(items);
}

searchEl.addEventListener('input',applyFilters);
categoryEl.addEventListener('change',applyFilters);
sortEl.addEventListener('change',applyFilters);

render(DATA);