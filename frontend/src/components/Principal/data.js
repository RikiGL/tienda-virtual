const products = [
    {
      id: 1,
      nombre: 'Néctar durazno',
      descripcion: 'Néctar durazno del valle 1 lt',
      precio: 1.20,
      categoria: 'Bebidas',
      imagen: 'Nectar_valle.jpg',
      inventario: 35,
      quantity: 0
    },
    {
      id: 2,
      nombre: 'Néctar Naranja',
      descripcion: 'Néctar Naranja tru 1 lt.',
      precio: 1.39,
      categoria: 'Bebidas',
      imagen: 'Nectar_Naranja.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 3,
      nombre: 'Jugo de uva',
      descripcion: 'Pack x 6 jugo uva huesitos 185 ml c/u',
      precio: 2.31,
      categoria: 'Bebidas',
      imagen: 'jugo_uva.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 4,
      nombre: 'Néctar manzana',
      descripcion: 'Néctar manzana pulp 1 lt',
      precio: 1.23,
      categoria: 'Bebidas',
      imagen: 'Nectar_Manzana.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 5,
      nombre: 'Néctar Mora',
      descripcion: 'Sunny nectar sabor a mora pet 300 ml',
      precio: 0.72,
      categoria: 'Bebidas',
      imagen: 'Nectar_Mora.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 6,
      nombre: 'Fuze tea',
      descripcion: 'Fuze tea te negro limón 1.50 lt',
      precio: 1.44,
      categoria: 'Bebidas',
      imagen: 'Fuze-Tea.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 7,
      nombre: 'Té de durazno',
      descripcion: 'Té de durazno lipton lata 340 ml',
      precio: 1.23,
      categoria: 'Bebidas',
      imagen: 'Te_durazno.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 8,
      nombre: 'Frutaris Manzana',
      descripcion: 'Bebida gasificada manzana frutaris 1 lt',
      precio: 0.49,
      categoria: 'Bebidas',
      imagen: 'Frutaris.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 9,
      nombre: 'Zen Limón',
      descripcion: 'Lima limon zen 540ml',
      precio: 0.69,
      categoria: 'Bebidas',
      imagen: 'Zen_Limon.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 10,
      nombre: 'Agua Gasificada toronjal imperial',
      descripcion: 'Agua gasificada sabor a toronjal imperial 550ml',
      precio: 0.75,
      categoria: 'Bebidas',
      imagen: 'AguaGasificada_Toronjal.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 11,
      nombre: 'Limonada güitig',
      descripcion: 'Limonada güitig 300ml.',
      precio: 0.50,
      categoria: 'Bebidas',
      imagen: 'Guitig_limon.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 12,
      nombre: 'Agua mineral con gas limon+ jengibre',
      descripcion: 'Agua mineral con gas limon+ jengibre san felipe 400ml',
      precio: 1.49,
      categoria: 'Bebidas',
      imagen: 'limon+jengibre.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 13,
      nombre: 'Agua mineral con gas sandía san felipe plus',
      descripcion: 'Agua mineral con gas limon+ jengibre san felipe 400ml',
      precio: 0.94,
      categoria: 'Bebidas',
      imagen: 'Agua mineral_sandia.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 14,
      nombre: 'Dasani manzana',
      descripcion: 'Dasani bebida saborizada sabor a manzana arca 300 ml',
      precio: 0.32,
      categoria: 'Bebidas',
      imagen: 'Dasani_manzana.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 15,
      nombre: 'Powerade mora azul',
      descripcion: 'Powerade hidratante mora azul 1 lt',
      precio: 0.99,
      categoria: 'Bebidas',
      imagen: 'Powerade_mora_azul.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 16,
      nombre: 'Gatorade tropical fruit',
      descripcion: 'Gatorade tropical fruit 750 ml',
      precio: 1.09,
      categoria: 'Bebidas',
      imagen: 'Gatorade_tropical_fruit.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 17,
      nombre: 'Gatorade apple ice',
      descripcion: 'Gatorade apple ice 750 ml',
      precio: 1.09,
      categoria: 'Bebidas',
      imagen: 'Gatorade_apple_ice.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 18,
      nombre: 'Powerade uva',
      descripcion: 'Powerade hidratante uva lt',
      precio: 0.99,
      categoria: 'Bebidas',
      imagen: 'Powerade_uva.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 19,
      nombre: 'Sporade tropical',
      descripcion: 'Sporade bebida hidratante pet tropical 500 ml',
      precio: 0.48,
      categoria: 'Bebidas',
      imagen: 'Sporade_tropical.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 20,
      nombre: 'Bebida hidratante fresa',
      descripcion: 'Bebida hidratante fresa electrolit 625ml',
      precio: 2.18,
      categoria: 'Bebidas',
      imagen: 'fresa_electrolit.png',
      inventario: 30,
      quantity: 0
    },
    {
      id: 21,
      nombre: 'Agua con gas güitig',
      descripcion: 'Agua con gas güitig 1.5 lt',
      precio: 0.78,
      categoria: 'Bebidas',
      imagen: 'guitig.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 22,
      nombre: 'Red bull',
      descripcion: 'Red bull energy drink 250 ml',
      precio: 2.75,
      categoria: 'Bebidas',
      imagen: 'Red_bull.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 23,
      nombre: '22Ov',
      descripcion: '220v energizante 330 ml.',
      precio: 0.49,
      categoria: 'Bebidas',
      imagen: '22Ov.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 24,
      nombre: 'Refresco naranja',
      descripcion: 'Refresco naranja del valle 1.75 lt.',
      precio: 0.49,
      categoria: 'Bebidas',
      imagen: 'Refresco_Naranja.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 25,
      nombre: 'Coca cola',
      descripcion: 'Coca cola botella 2 lt.',
      precio: 0.99,
      categoria: 'Bebidas',
      imagen: 'Coca cola.jpg',
      inventario: 30,
      quantity: 0
    },
    {id: 26,
    nombre: 'Tomate riñón',
    descripcion: 'Tomate riñón malla la casera 1 kg.',
    precio: 1.00,
    categoria: 'Verduras-Legumbres',
    imagen: 'Tomate_riñón.jpg',
    inventario: 30,
    quantity: 0
  },
  {
    id: 27,
    nombre: 'Brócoli',
    descripcion: 'Brócoli 1 unidad.',
    precio: 0.80,
    categoria: 'Verduras-Legumbres',
    imagen: 'Brócoli.jpg',
    inventario: 30,
    quantity: 0
  },
  {
    id: 28,
    nombre: 'Lechuga crespa',
    descripcion: 'Lechuga crespa 1 unidad.',
    precio: 0.54,
    categoria: 'Verduras-Legumbres',
    imagen: 'Lechuga_crespa.jpg',
    inventario: 30,
    quantity: 0
  },
  {
    id: 29,
    nombre: 'Coliflor',
    descripcion: 'Coliflor 1 unidad.',
    precio: 0.77,
    categoria: 'Verduras-Legumbres',
    imagen: 'Coliflor.jpg',
    inventario: 30,
    quantity: 0
  },
  {
    id: 30,
    nombre: 'Lechuga criolla',
    descripcion: 'Lechuga criolla guadaproducts 400 gr.',
    precio: 0.63,
    categoria: 'Verduras-Legumbres',
    imagen: 'Lechuga_criolla.jpg',
    inventario: 30,
    quantity: 0
  },
  {
    id: 31,
    nombre: 'Apio',
    descripcion: 'Apio atado.',
    precio: 0.63,
    categoria: 'Verduras-Legumbres',
    imagen: 'Apio.jpg',
    inventario: 30,
    quantity: 0
  },
  {
    id: 32,
    nombre: 'Col morada',
    descripcion: 'Col morada 1 unidad.',
    precio: 0.63,
    categoria: 'Verduras-Legumbres',
    imagen: 'Col_morada.jpg',
    inventario: 30,
    quantity: 0
  },
  {
    id: 33,
    nombre: 'Tomate cherry',
    descripcion: 'Tomate cherry farm fresh bandeja 300gr.',
    precio: 1.81,
    categoria: 'Verduras-Legumbres',
    imagen: 'Tomate_cherry.jpg',
    inventario: 30,
    quantity: 0
  },
  {
    id: 34,
    nombre: 'Cebolla roja',
    descripcion: 'Cebolla roja la baneña kg.',
    precio: 1.59,
    categoria: 'Verduras-Legumbres',
    imagen: 'Cebolla_roja.jpg',
    inventario: 30,
    quantity: 0
  },
  {
    id: 35,
    nombre: 'Cilantro',
    descripcion: 'Cilantro atado 1 unidad.',
    precio: 1.00,
    categoria: 'Verduras-Legumbres',
    imagen: 'Cilantro.jpg',
    inventario: 15,
    quantity: 0
  },
  {
    id: 36,
    nombre: 'Queso mozzarella',
    descripcion: 'Queso mozzarella kiosko 200 gr.',
    precio: 2.50,
    categoria: 'Lacteos',
    imagen: 'Queso_mozzarella.jpg',
    inventario: 10,
    quantity: 0
  },
  {
    id: 37,
    nombre: 'Queso cheddar',
    descripcion: 'Queso cheddar floralp 200 gr.',
    precio: 3.50,
    categoria: 'Lacteos',
    imagen: 'Queso_cheddar.jpg',
    inventario: 10,
    quantity: 0
  },
  {
    id: 38,
    nombre: 'Queso crema',
    descripcion: 'Queso crema toni 250 gr.',
    precio: 2.41,
    categoria: 'Lacteos',
    imagen: 'Queso_crema.jpg',
    inventario: 10,
    quantity: 0
  },
  {
    id: 39,
    nombre: 'Queso parmesano',
    descripcion: 'Kiosko parmesano rallado 40gr',
    precio: 1.17,
    categoria: 'Lacteos',
    imagen: 'Queso_parmesano.jpg',
    inventario: 10,
    quantity: 0
  },
  {
    id: 40,
    nombre: 'Queso sanduchero',
    descripcion: 'Queso lonja sanduchero kiosko 150 gr.',
    precio: 3.16,
    categoria: 'Lacteos',
    imagen: 'Queso_sanduchero.jpg',
    inventario: 10,
    quantity: 0
  },
  {
    id: 41,
    nombre: 'Yogurt griego',
    descripcion: 'Yogurt griego natural zeus 400 gr.',
    precio: 2.34,
    categoria: 'Lacteos',
    imagen: 'Yogurt_griego.jpg',
    inventario: 15,
    quantity: 0
  },
  {
    id: 42,
    nombre: 'Yogurt toni mix',
    descripcion: 'Yogurt sabor frutilla toni mix 180 ml.',
    precio: 0.90,
    categoria: 'Lacteos',
    imagen: 'toni_mix.jpg',
    inventario: 20,
    quantity: 0
  },
  {
    id: 43,
    nombre: 'Yogurt sabor mora',
    descripcion: 'Yogurt bebible sabor mora kiosko funda 900 ml.',
    precio: 1.38,
    categoria: 'Lacteos',
    imagen: 'Yogurt_mora.jpg',
    inventario: 10,
    quantity: 0
  },
  {
    id: 44,
    nombre: 'Yogurt sabor frutilla',
    descripcion: 'Bebida de yogurt sabor frutilla lenutrit 3.8 kg.',
    precio: 5.50,
    categoria: 'Lacteos',
    imagen: 'Yogurt_frutilla.jpg',
    inventario: 10,
    quantity: 0
  },
  {
    id: 45,
    nombre: 'Crema de leche',
    descripcion: 'Crema de leche reyleche 900 ml.',
    precio: 4.50,
    categoria: 'Lacteos',
    imagen: 'Crema_leche.jpg',
    inventario: 20,
    quantity: 0
  },
  {
    id: 46,
    nombre: 'Mantequilla',
    descripcion: 'Mantequilla con sal kiosko 250gr',
    precio: 3.15,
    categoria: 'Lacteos',
    imagen: 'Mantequilla.jpg',
    inventario: 20,
    quantity: 0
  },
  {
    id: 47,
    nombre: 'Leche deslactosada',
    descripcion: 'Leche deslactosada reyleche funda 900 ml',
    precio: 0.83,
    categoria: 'Lacteos',
    imagen: 'reyleche.jpg',
    inventario: 30,
    quantity: 0
  },
  {
    id: 48,
    nombre: 'Leche entera',
    descripcion: 'Leche entera vita 1100 ml',
    precio: 1.03,
    categoria: 'Lacteos',
    imagen: 'Leche_entera.jpg',
    inventario: 30,
    quantity: 0
  },
  {
    id: 49,
    nombre: 'Leche descremada',
    descripcion: 'Leche vita descremada funda 900 ml',
    precio: 0.95,
    categoria: 'Lacteos',
    imagen: 'Leche_descremada.jpg',
    inventario: 20,
    quantity: 0
  },
  {
    id: 50,
    nombre: 'Leche semidescremada',
    descripcion: 'Cartón leche semidescremada nutri 1 lt.',
    precio: 1.35,
    categoria: 'Lacteos',
    imagen: 'Leche_semidescremada.jpg',
    inventario: 30,
    quantity: 0
  },
  {
    id: 51,
    nombre: 'Leche chocolatada',
    descripcion: 'Leche la lechera chocolatada 1 lt.',
    precio: 2.48,
    categoria: 'Lacteos',
    imagen: 'Leche_chocolatada.png',
    inventario: 25,
    quantity: 0
  },
  {
    id: 52,
    nombre: 'Banano seda',
    descripcion: 'Banano seda kg',
    precio: 1.09,
    categoria: 'Frutas',
    imagen: 'Banano.jpg',
    inventario: 10,
    quantity: 0
  },
  {
    id: 53,
    nombre: 'Arándano',
    descripcion: 'Arándano san jose 125 gr',
    precio: 2.20,
    categoria: 'Frutas',
    imagen: 'Arándano.jpg',
    inventario: 10,
    quantity: 0
  },
  {
    id: 54,
    nombre: 'Limón',
    descripcion: 'Limón sutil kg',
    precio: 1.55,
    categoria: 'Frutas',
    imagen: 'Limón.jpg',
    inventario: 15,
    quantity: 0
  },
  {
    id: 55,
    nombre: 'Frutilla',
    descripcion: 'Frutilla especial bandeja fresh frut 500 gr',
    precio: 1.55,
    categoria: 'Frutas',
    imagen: 'Frutilla.jpg',
    inventario: 15,
    quantity: 0
  },
  {
    id: 56,
    nombre: 'Plátano Verde',
    descripcion: 'Plátano Verde kg',
    precio: 0.96,
    categoria: 'Frutas',
    imagen: 'Plátano.jpg',
    inventario: 15,
    quantity: 0
  },
  {
    id: 57,
    nombre: 'Aguacate',
    descripcion: 'Bandeja aguacate hortilisto 2 uni',
    precio: 1.87,
    categoria: 'Frutas',
    imagen: 'Aguacate.jpg',
    inventario: 15,
    quantity: 0
  },
  {
    id: 58,
    nombre: 'Plátano Maduro',
    descripcion: 'Plátano Maduro kg',
    precio: 1.02,
    categoria: 'Frutas',
    imagen: 'maduro.jpg',
    inventario: 25,
    quantity: 0
  },
  {
    id: 59,
    nombre: 'Mango tommy',
    descripcion: 'Mango tommy 1 unidad',
    precio: 0.73,
    categoria: 'Frutas',
    imagen: 'mango.jpg',
    inventario: 25,
    quantity: 0
  },
  {
    id: 60,
    nombre: 'Naranja',
    descripcion: 'Naranja kg (malla)',
    precio: 1.33,
    categoria: 'Frutas',
    imagen: 'Naranja.png',
    inventario: 15,
    quantity: 0
  },
  {
    id: 61,
    nombre: 'Manzana',
    descripcion: 'Angie manzana rosada gala funda economico',
    precio: 0.99,
    categoria: 'Frutas',
    imagen: 'manzana.jpg',
    inventario: 15,
    quantity: 0
  },
  {
    id: 62,
    nombre: 'Uva rosada',
    descripcion: 'Uva rosada funda fruit snack angie',
    precio: 5.59,
    categoria: 'Frutas',
    imagen: 'uvas.jpg',
    inventario: 15,
    quantity: 0
  },
  {
    id: 63,
    nombre: 'Pan blanco',
    descripcion: 'Pan blanco supan 750gr',
    precio: 1.73,
    categoria: 'Enlatados-Panificados',
    imagen: 'Pan_blanco.jpg',
    inventario: 15,
    quantity: 0
  },
  {
    id: 64,
    nombre: 'Pan blanco sin corteza',
    descripcion: 'Pan blanco sin corteza bimbo 450 gr.',
    precio: 1.83,
    categoria: 'Enlatados-Panificados',
    imagen: 'sin_corteza.jpg',
    inventario: 15,
    quantity: 0
  },
  {
    id: 65,
    nombre: 'Pan integral',
    descripcion: 'Pan integral supan 600 g.',
    precio: 2.26,
    categoria: 'Enlatados-Panificados',
    imagen: 'Pan _integral.jpg',
    inventario: 15,
    quantity: 0
  },
  {
    id: 66,
    nombre: 'Tostadas naturales',
    descripcion: 'Tostadas naturales grile 100 gr.',
    precio: 1.83,
    categoria: 'Enlatados-Panificados',
    imagen: 'Tostadas.jpg',
    inventario: 15,
    quantity: 0
  },
  {
    id: 67,
    nombre: 'Fréjol con tocino',
    descripcion: 'Fréjol con tocino facundo 425 gr',
    precio: 1.88,
    categoria: 'Enlatados-Panificados',
    imagen: 'Fréjol.png',
    inventario: 15,
    quantity: 0
  },
  {
    id: 68,
    nombre: 'Maíz dulce',
    descripcion: 'Maíz dulce facundo 425 gr.',
    precio: 1.93,
    categoria: 'Enlatados-Panificados',
    imagen: 'Maíz.png',
    inventario: 15,
    quantity: 0
  },
  {
    id: 69,
    nombre: 'Atún pack x 3',
    descripcion: 'Atún aceite abre fácil van camps pack x 3 de 80 gr',
    precio: 2.39,
    categoria: 'Enlatados-Panificados',
    imagen: 'Atún_pack.jpg',
    inventario: 35,
    quantity: 0
  },
  {
    id: 70,
    nombre: 'Atún',
    descripcion: 'Atún aceite abre fácil real 140 gr',
    precio: 1.43,
    categoria: 'Enlatados-Panificados',
    imagen: 'Atún.jpg',
    inventario: 35,
    quantity: 0
  },
  {
    id: 71,
    nombre: 'Sardina',
    descripcion: 'Sardina tinapa tarro abre fácil van camps 155 gr',
    precio: 0.87,
    categoria: 'Enlatados-Panificados',
    imagen: 'Sardina.jpg',
    inventario: 35,
    quantity: 0
  },
  {
    id: 72,
    nombre: 'Duraznos',
    descripcion: 'Duraznos mitades facundo 820 gr',
    precio: 3.07,
    categoria: 'Enlatados-Panificados',
    imagen: 'duraznos.png',
    inventario: 35,
    quantity: 0
  },
  {
    id: 73,
    nombre: 'Chuleta de cerdo',
    descripcion: 'Chuleta pierna de cerdo kg',
    precio: 6.14,
    categoria: 'Carnes-Embutidos',
    imagen: 'chuleta-cerdo.jpg',
    inventario: 15,
    quantity: 0
  },
  {
    id: 74,
    nombre: 'Chicharrón de cerdo',
    descripcion: 'Chicharrón de cerdo bandeja kg',
    precio: 4.82,
    categoria: 'Carnes-Embutidos',
    imagen: 'Chicharrón-cerdo.jpg',
    inventario: 15,
    quantity: 0
  },
  {
    id: 75,
    nombre: 'Costilla de cerdo',
    descripcion: 'Costilla cerdo kg',
    precio: 8.77,
    categoria: 'Carnes-Embutidos',
    imagen: 'Costilla_cerdo.jpg',
    inventario: 15,
    quantity: 0
  },
   {
      id: 76,
      nombre: 'Carne molida de res',
      descripcion: 'Carne molida de res tipo i kg', 
      precio: 4.54,
      categoria:'Carnes-Embutidos',
      imagen: 'molida_res.jpg',
      inventario: 10,
      quantity: 0
    },
    {
      id: 77,
      nombre: 'Costilla de res',
      descripcion: 'Costilla de res kg', 
      precio: 3.91,
      categoria:'Carnes-Embutidos',
      imagen: 'Costilla_res.jpg',
      inventario: 10,
      quantity: 0
    },
    {
      id: 78,
      nombre: 'Lomo de res',
      descripcion: 'Lomo de res sin grasa kg', 
      precio: 14.86,
      categoria:'Carnes-Embutidos',
      imagen: 'lomo_res.jpg',
      inventario: 5,
      quantity: 0
    },
    {
      id: 79,
      nombre: 'Muslos de pollo',
      descripcion: 'Muslos de pollo bandeja oro kg', 
      precio: 3.20,
      categoria:'Carnes-Embutidos',
      imagen: 'Muslos_pollo.jpg',
      inventario: 10,
      quantity: 0
    },
    {
      id: 80,
      nombre: 'Pechuga de pollo',
      descripcion: 'Pechuga bandeja oro kg', 
      precio: 5.96,
      categoria:'Carnes-Embutidos',
      imagen: 'Pechuga_pollo.jpg',
      inventario: 10,
      quantity: 0
    },
    {
      id: 81,
      nombre: 'Pollo Completo',
      descripcion: 'Pollo mr. pollo completo extragrande 2,5 kg.', 
      precio: 8.72,
      categoria:'Carnes-Embutidos',
      imagen: 'pollo_completo.png',
      inventario: 10,
      quantity: 0
    },
    {
      id: 82,
      nombre: 'Alitas de Pollo',
      descripcion: 'Alitas de pollo bandeja oro kg.', 
      precio: 6.82,
      categoria:'Carnes-Embutidos',
      imagen: 'Alitas_pollo.jpg',
      inventario: 10,
      quantity: 0
    },
    {
      id: 83,
      nombre: 'Tocino',
      descripcion: 'Tocino ahumado la castilla 1kg', 
      precio: 11.20,
      categoria:'Carnes-Embutidos',
      imagen: 'Tocino.jpg',
      inventario: 10,
      quantity: 0
    },
    {
      id: 84,
      nombre: 'Jamón',
      descripcion: 'Jamón americano plumrose kg', 
      precio: 8.59,
      categoria:'Carnes-Embutidos',
      imagen: 'Jamón.png',
      inventario: 10,
      quantity: 0
    },
    
    {
      id: 85,
      nombre: 'Mortadela',
      descripcion: 'Mortadela plumrose linea diaria 1.1 kg.', 
      precio: 4.72,
      categoria:'Carnes-Embutidos',
      imagen: 'Mortadela.jpg',
      inventario: 20,
      quantity: 0
    },
    {
      id: 86,
      nombre: 'Chorizo',
      descripcion: 'Chorizo parrillero premium fritz kg.', 
      precio: 6.66,
      categoria:'Carnes-Embutidos',
      imagen: 'Chorizo.jpg',
      inventario: 10,
      quantity: 0
    },
    {
      id: 87,
      nombre: 'Huevos',
      descripcion: 'Huevo grande indaves x 12 un.', 
      precio: 2.41,
      categoria:'Abastos',
      imagen: 'Huevos.jpg',
      inventario: 10,
      quantity: 0
    },
    {
      id: 88,
      nombre: 'Tallarín rapidito',
      descripcion: 'Tallarín fideo rapidito pollo oriental 500 gr', 
      precio: 3.18,
      categoria:'Abastos',
      imagen: 'rapidito.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 89,
      nombre: 'Lonchis pollo',
      descripcion: 'Lonchys pollo 64 gr c/u pack x 4', 
      precio: 3.18,
      categoria:'Abastos',
      imagen: 'lonchis.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 90,
      nombre: 'Fideo broca',
      descripcion: 'Fideo broca cayambe 400 gr', 
      precio: 3.18,
      categoria:'Abastos',
      imagen: 'Fideo.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 91,
      nombre: 'Fideo lazo',
      descripcion: 'Fideo lazo redondo paca 400 gr', 
      precio: 1.10,
      categoria:'Abastos',
      imagen: 'Fideo_lazo.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 92,
      nombre: 'Fideo cabello de angel',
      descripcion: 'Fideo cabello de angel don vittorio 400 gr', 
      precio: 1.22,
      categoria:'Abastos',
      imagen: 'cabello_angel.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 93,
      nombre: 'Tallarín',
      descripcion: 'Tallarín fideo chino oriental 200 gr', 
      precio: 1.22,
      categoria:'Abastos',
      imagen: 'Tallarín.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 94,
      nombre: 'Salsa de Tomate',
      descripcion: 'Salsa de tomate ecopack los andes 400 gr', 
      precio: 1.62,
      categoria:'Abastos',
      imagen: 'Salsa.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 95,
      nombre: 'Mayonesa',
      descripcion: 'Mayonesa doypack maggi 200 gr', 
      precio: 1.65,
      categoria:'Abastos',
      imagen: 'Mayonesa.png',
      inventario: 30,
      quantity: 0
    },
    {
      id: 96,
      nombre: 'Mostaza',
      descripcion: 'Mostaza doypack maggi 200 gr', 
      precio: 1.18,
      categoria:'Abastos',
      imagen: 'Mostaza.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 97,
      nombre: 'Aceite de soya',
      descripcion: 'Aceite soya la favorita 900 ml', 
      precio: 2.57,
      categoria:'Abastos',
      imagen: 'Aceite_soya.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 98,
      nombre: 'Aceite de girasol',
      descripcion: 'Aceite girasol 1 lt', 
      precio: 2.98,
      categoria:'Abastos',
      imagen: 'Aceite_girasol.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 99,
      nombre: 'Aceite vegetal',
      descripcion: 'Aceite vegetal la favorita 1 lt', 
      precio: 2.98,
      categoria:'Abastos',
      imagen: 'Aceite_vegetal.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 100,
      nombre: 'Azucar',
      descripcion: 'Azúcar san carlos kg', 
      precio: 1.10,
      categoria:'Abastos',
      imagen: 'Azucar.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 101,
      nombre: 'Arroz',
      descripcion: 'Arroz envejecido rico 2 kg', 
      precio: 2.87,
      categoria:'Abastos',
      imagen: 'Arroz.png',
      inventario: 30,
      quantity: 0
    },
    {
      id: 102,
      nombre: 'Café',
      descripcion: 'Café tradición nescafe ahorra/pack 50 gr', 
      precio: 1.35,
      categoria:'Abastos',
      imagen: 'Café.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 103,
      nombre: 'Sal',
      descripcion: 'Sal de mesa cris-sal 1 kg', 
      precio: 0.49,
      categoria:'Abastos',
      imagen: 'Sal.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 104,
      nombre: 'Avena',
      descripcion: 'Ya avena 500 gr', 
      precio: 1.22,
      categoria:'Abastos',
      imagen: 'Avena.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 105,
      nombre: 'Harina',
      descripcion: 'Harina ya 500gr', 
      precio: 1.22,
      categoria:'Abastos',
      imagen: 'Harina.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 106,
      nombre: 'Vive 100',
      descripcion: 'Vive100% bebida energizante 300 ml.', 
      precio: 0.49,
      categoria:'Bebidas',
      imagen: 'Vive100.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 107,
      nombre: 'Salchicha',
      descripcion: 'Salchicha la italiana vienesa gruesa kg', 
      precio: 3.66,
      categoria:'Carnes-Embutidos',
      imagen: 'Salchicha.jpg',
      inventario: 10,
      quantity: 0
    },
    {
      id: 108,
      nombre: 'Papa chola',
      descripcion: 'Papa chola granel kg.', 
      precio: 1.59,
      categoria:'Verduras-Legumbres',
      imagen: 'Papa_chola.jpg',
      inventario: 30,
      quantity: 0
    },
    {
      id: 109,
      nombre: 'Monster Energy',
      descripcion: 'Bebida energizante ultra paradise monster 473ml', 
      precio: 2.70,
      categoria:'Bebidas',
      imagen: 'Monster_Energy.jpg',
      inventario: 30,
      quantity: 0
    },
  ];
  
  export default products;