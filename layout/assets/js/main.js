

var cadastro = new Vue({
	el:'#cadastro',
	data:{
		pagina:0,
		titulo:["Dados Pessoais", "Endereço", "Curso", "Assinatura"],
		nome: '',
		sobrenome: '',
		email:'',
		datanasc:'',
		rg:'',
		cpf:'',
		cep:'',
		logradouro:'',
		telefone:'',
		sexo:'Masculino',
		numero:'',
		complemento:'',
		bairro:'',
		cidade:'',
		estado:'',
		pais:'',
		opcao1:'Ciência da Computação',
		unidade1:'Tech University - Unidade Centro',
		opcao2:'Sistemas de Informação',
		unidade2:'Tech University - Unidade Raja',
		unidades:['Tech University - Unidade Centro', 'Tech University - Unidade Raja'],
		cursos:{'Tech University - Unidade Centro':[
				'Ciência da Computação',
				'Redes',
				'Engenharia da Computação',
				'CST em Banco de Dados'
			],
			'Tech University - Unidade Raja':[
				'Sistemas de Informação',
				'Análise e Desenvolvimento de Sistemas',
				'Ciência da Computação',
				'Engenharia de Software',
				'Design de Jogos'
			]
		},
		assinador_ativo:false,
		img_source:'',
		assinou:false,
		assinatura_msg:'Faça sua assinatura clicando aqui'
	},

	computed: {
        tituloAtual: function() {
            return this.titulo[this.pagina];
        },

        cursosOpcao1: function() {
            return this.cursos[this.unidade1];
        },

        cursosOpcao2: function() {
            return this.cursos[this.unidade2];
        },

        validarPagina: function() {
        	if (this.pagina == 0) {
        		if (this.preenchido(this.nome) &&
        			this.preenchido(this.sobrenome) &&
        			this.validarEmail &&
        			this.entradaValida(this.telefone, 14) &&
        			this.entradaValida(this.datanasc, 10) &&
        			this.entradaValida(this.rg, 13)&&
        			this.entradaValida(this.cpf, 14)) {
        			return true;
        		} else return false;
        	} else if (this.pagina == 1) {
        		if (this.preenchido(this.logradouro) &&
        			this.preenchido(this.bairro) &&
        			this.preenchido(this.cidade) &&
        			this.preenchido(this.estado) &&
        			this.preenchido(this.pais)) {
        			return true;
        		} else return false;
        	} else if (this.pagina == 2) {
        		if (this.preenchido(this.unidade1) &&
        			this.preenchido(this.unidade2) &&
        			this.preenchido(this.opcao1) &&
        			this.preenchido(this.opcao2)) {
        			return true;
        		} else return false;
        	} else if (this.pagina == 3) {
        		if (this.assinou) {
        			return true;
        		} else return false;
        	}
        },

        botaoMsg: function() {
        	if (this.pagina < 3) {
        		return 'Continuar';
        	} else return 'Enviar';
        },

        validarEmail: function (){
			usuario = this.email.substring(0, this.email.indexOf("@"));
			dominio = this.email.substring(this.email.indexOf("@")+ 1, this.email.length);

			if ((usuario.length >=1) &&
			    (dominio.length >=3) && 
			    (usuario.search("@")==-1) && 
			    (dominio.search("@")==-1) &&
			    (usuario.search(" ")==-1) && 
			    (dominio.search(" ")==-1) &&
			    (dominio.search(".")!=-1) &&      
			    (dominio.indexOf(".") >=1)&& 
			    (dominio.lastIndexOf(".") < dominio.length - 2)) {
				return true;
			} else return false;
		}
    },

	methods:{
		passarPagina: function(e){
			e.preventDefault();
			if (this.validarPagina) {
				if (this.pagina < 3) {
					this.pagina++;
				} else this.enviarDados();
			}	
		},

		enviarDados: function(){// para enviar os dados de forma assicrona
			axios.post('http://localhost:3000/relatorio',
				{
					nome: this.nome,
					sobrenome: this.sobrenome,
					email: this.email,
					datanasc: this.datanasc,
					rg: this.rg,
					cpf: this.cpf,
					cep: this.cep,
					logradouro: this.logradouro,
					numero: this.numero,
					complemento: this.complemento,
					bairro: this.bairro,
					cidade: this.cidade,
					estado: this.estado,
					pais: this.pais,
					unidade1: this.unidade1,
					unidade2: this.unidade2,
					opcao1: this.opcao1,
					opcao2: this.opcao2,
					assinatura: this.img_source 
				})
			  .then(function(response){
			    //em caso de sucesso mandar para a pagina de exibição
			  });  
		},

		voltarPagina: function(e){
			e.preventDefault();
			this.pagina--;
		},

		entradaValida: function(campo, valorEsperado){
			if (campo.length >= valorEsperado) {
        		return true;
        	} else return false;
		},

		reset: function(){
			setInterval(function(){
				if (this.validarPagina) {
					this.nome = '';
					this.sobrenome = '';
					this.email  = '';
					this.datanasc = '';
					this.rg = '';
					this.cpf = '';
					this.cep = '';
					this.logradouro = '';
					this.numero = '';
					this.complemento = '';
					this.bairro = '';
					this.cidade = '';
					this.estado = '';
					this.pais = '';
					this.opcao1 ='Ciência da Computação';
					this.unidade1 = 'Tech University - Unidade Centro';
					this.opcao2 = 'Sistemas de Informação';
					this.unidade2 = 'Tech University - Unidade Raja';
					this.img_source = '';
					this.assinou = false;
					this.telefone = '';
					this.assinatura_msg ='Faça sua assinatura clicando aqui';
					this.pagina = 0;
				}
			}, 100);
		},

		preenchido: function(campo){
			if (campo != '') {
        		return true;
        	} return false;
		},

		buscaCep: function(event){
			axios.get('http://api.postmon.com.br/v1/cep/'+this.cep)
			  .then(function(response){
			    cadastro.complemento = response.data.complemento;
			    cadastro.bairro = response.data.bairro;
			    cadastro.logradouro = response.data.logradouro;
			    cadastro.estado = response.data.estado_info.nome;
			    cadastro.cidade = response.data.cidade;
			  }); 
		}
	}
});

setInterval(function(){
	if (cadastro.assinador_ativo) {
		document.getElementById('overlay').style.display = 'inline';
		document.getElementById('paint').style.display = 'inline';
		window.scrollTo(0, 0);
	} else {
		document.getElementById('overlay').style.display = 'none';
		document.getElementById('paint').style.display = 'none';
	}
},100);

cancelar.addEventListener('click', function() {
    cadastro.assinador_ativo = false;
}, false);


canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y); 
    canvas.addEventListener('mousemove', onPaint, false);
}, false);

 
canvas.addEventListener('mouseup', function(e) {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);


confirmar.addEventListener('click', function() {
    var image = new Image();
	image.src = canvas.toDataURL("image/png");
	cadastro.img_source = image.src;
	cadastro.assinatura_msg = 'Clique aqui para fazer sua assinatura de novo'
	cadastro.assinou = true;
	cadastro.assinador_ativo = false;

}, false);

limpar.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}, false);

