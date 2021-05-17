const operators = ["0424", "0414", "0416", "0426", "0412"];
const  banks = [
    {
        "id": "0156",
        "name": "100%BANCO"
    },
    {
        "id": "0156",
        "name": "100%BANCO"
    },
    {
        "id": "0196",
        "name": "ABN AMRO BANK"
    },
    {
        "id": "0172",
        "name": "BANCAMIGA BANCO MICROFINANCIERO, C.A."
    },
    {
        "id": "0171",
        "name": "BANCO ACTIVO BANCO COMERCIAL, C.A."
    },
    {
        "id": "0166",
        "name": "BANCO AGRICOLA"
    },
    {
        "id": "0175",
        "name": "BANCO BICENTENARIO"
    },
    {
        "id": "0128",
        "name": "BANCO CARONI, C.A. BANCO UNIVERSAL"
    },
    {
        "id": "0164",
        "name": "BANCO DE DESARROLLO DEL MICROEMPRESARIO"
    },
    {
        "id": "0102",
        "name": "BANCO DE VENEZUELA S.A.C.A. BANCO UNIVERSAL"
    },
    {
        "id": "0114",
        "name": "BANCARIBE C.A. BANCO UNIVERSAL"
    },
    {
        "id": "0149",
        "name": "BANCO DEL PUEBLO SOBERANO C.A."
    },
    {
        "id": "0163",
        "name": "BANCO DEL TESORO"
    },
    {
        "id": "0176",
        "name": "BANCO ESPIRITO SANTO, S.A."
    },
    {
        "id": "0115",
        "name": "BANCO EXTERIOR C.A."
    },
    {
        "id": "0003",
        "name": "BANCO INDUSTRIAL DE VENEZUELA."
    },
    {
        "id": "0173",
        "name": "BANCO INTERNACIONAL DE DESARROLLO, C.A."
    },
    {
        "id": "0105",
        "name": "BANCO MERCANTIL C.A."
    },
    {
        "id": "0191",
        "name": "BANCO NACIONAL DE CREDITO"
    },
    {
        "id": "0116",
        "name": "BANCO OCCIDENTAL DE DESCUENTO."
    },
    {
        "id": "0138",
        "name": "BANCO PLAZA"
    },
    {
        "id": "0108",
        "name": "BANCO PROVINCIAL BBVA"
    },
    {
        "id": "0104",
        "name": "BANCO VENEZOLANO DE CREDITO S.A."
    },
    {
        "id": "0168",
        "name": "BANCRECER S.A. BANCO DE DESARROLLO"
    },
    {
        "id": "0134",
        "name": "BANESCO BANCO UNIVERSAL"
    },
    {
        "id": "0177",
        "name": "BANFANB"
    },
    {
        "id": "0146",
        "name": "BANGENTE"
    },
    {
        "id": "0174",
        "name": "BANPLUS BANCO COMERCIAL C.A"
    },
    {
        "id": "0190",
        "name": "CITIBANK."
    },
    {
        "id": "0121",
        "name": "CORP BANCA."
    },
    {
        "id": "0157",
        "name": "DELSUR BANCO UNIVERSAL"
    },
    {
        "id": "0151",
        "name": "BFC BANCO FONDO COMÚN C.A. BANCO UNIVERSAL"
    },
    {
        "id": "0601",
        "name": "INSTITUTO MUNICIPAL DE CR&#201;DITO POPULAR"
    },
    {
        "id": "0169",
        "name": "MIBANCO BANCO DE DESARROLLO, C.A."
    },
    {
        "id": "0137",
        "name": "SOFITASA"
    }
];

// const n = "04242301342 25904097 0102".replace(/ /g,'');

const findPhoneNumber = (text, operators) => {
    let index = -1;
    for (let i = 0; i < operators.length; i++) {
        if (index > -1) break;
        index = text.search(operators[i]);
    }
    return `${text.split("").slice(index, 11).map(v => v).join("")}`;
};

const findBankCode = (text, banks) => {
    let index = -1;
    let bank = null;
    const options = {
        keys: ['name', 'id'],
    }
    const fuse = new Fuse(banks, options)
    const results = fuse.search(text);
    if (results.length) {
        bank = banks.find(({ id }) => id === results[0].item.id);
    }
    if (!bank) {
        for (let i = 0; i < banks.length; i++) {
            if (index >-1 ) {
                bank = banks[i - 1];
                break;
            };
            index = text.toLowerCase().replace("banco", "").search(banks[i].id);
        }
    }
    return bank;
};

const findDNI = (n, phoneNumber, bankCode) => {
    return n.replace(phoneNumber, "").replace(bankCode.id, "").replace(bankCode.name, "").match(/\d+/)[0];;
};

const resolve = () => {
    const n = document.querySelector("#text").value.replace(/ /g,'');
    const phoneNumber = findPhoneNumber(n, operators);
    const bankCode = findBankCode(n.replace(phoneNumber, ""), banks);
    document.querySelector("#phonenumber").value  = phoneNumber;
    document.querySelector("#bankcode").value = bankCode.id;
    document.querySelector("#bankname").value = bankCode.name;
    document.querySelector("#dni").value = findDNI(n, phoneNumber, bankCode);
};

const copyToClipboard = id => {
    const copyText = document.getElementById(id);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");

}
