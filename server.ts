import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

// Define DB paths
const dbPath = path.join(process.cwd(), "src", "database.json");

function getInitialSeedData() {
  return {
    "usuarios": [
      {
        "id": "user-super-admin-1",
        "nome": "Laura Fernanda (Super Admin)",
        "email": "laura@autoestima.com",
        "senha": "super",
        "tipo": "super_admin",
        "loja_id": "loja-1"
      },
      {
        "id": "user-dono-1",
        "nome": "Grazi Sabrina (Dona)",
        "email": "grazi@autoestima.com",
        "senha": "grazi",
        "tipo": "dono",
        "loja_id": "loja-1"
      },
      {
        "id": "user-prof-1",
        "nome": "Laura Fernanda",
        "email": "laura@autoestima.com",
        "senha": "laura",
        "tipo": "profissional",
        "loja_id": "loja-1",
        "profissional_id": "prof-1"
      },
      {
        "id": "user-prof-2",
        "nome": "Grazi Sabrina",
        "email": "grazi@autoestima.com",
        "senha": "grazi",
        "tipo": "profissional",
        "loja_id": "loja-1",
        "profissional_id": "prof-2"
      },
      {
        "id": "user-prof-3",
        "nome": "Juliana Mendes",
        "email": "ju@autoestima.com",
        "senha": "ju",
        "tipo": "profissional",
        "loja_id": "loja-1",
        "profissional_id": "prof-3"
      },
      {
        "id": "user-prof-4",
        "nome": "Camila Rocha",
        "email": "camila@autoestima.com",
        "senha": "camila",
        "tipo": "profissional",
        "loja_id": "loja-1",
        "profissional_id": "prof-4"
      },
      {
        "id": "user-cliente-1",
        "nome": "Mariana Santos",
        "email": "mari@cliente.com",
        "senha": "mari",
        "tipo": "cliente"
      }
    ],
    "lojas": [
      {
        "id": "loja-1",
        "nome": "Núcleo de Autoestima",
        "endereco": "Rua Rio Tibre, 291 - Novo Riacho, Contagem - MG",
        "telefone": "(31) 99296-5461 / (31) 98693-9893",
        "horario_funcionamento": {
          "inicio": "08:00",
          "fim": "18:00",
          "intervalo_inicio": "11:40",
          "intervalo_fim": "13:40",
          "split_shift_enabled": true
        },
        "slug": "nucleo-autoestima",
        "imagem": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400",
        "servicos_populares": [
          "Extensão de Cílios Lash",
          "Alongamento em Fibra de Vidro",
          "Design de Sobrancelhas"
        ],
        "instagram": "laurafernanda_lash"
      }
    ],
    "profissionais": [
      {
        "id": "prof-1",
        "loja_id": "loja-1",
        "nome": "Laura Fernanda",
        "especialidade": "Designer de Cílios & Lash Designer (@laurafernanda_lash)",
        "foto": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
      },
      {
        "id": "prof-2",
        "loja_id": "loja-1",
        "nome": "Grazi Sabrina",
        "especialidade": "Unhas, Designer de Sobrancelha & Estética (@studio_grazisabrina1)",
        "foto": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150"
      },
      {
        "id": "prof-3",
        "loja_id": "loja-1",
        "nome": "Juliana Mendes",
        "especialidade": "Design de Sobrancelha & Autoestima Coparceiro",
        "foto": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
      },
      {
        "id": "prof-4",
        "loja_id": "loja-1",
        "nome": "Camila Rocha",
        "especialidade": "Cabeleireira & Terapia Capilar",
        "foto": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
      }
    ],
    "servicos": [
      {
        "id": "serv-1",
        "loja_id": "loja-1",
        "nome": "Alongamento em Fibra de Vidro",
        "preco": 180,
        "duracao": 90,
        "categoria": "Unhas",
        "imagem": "https://images.unsplash.com/photo-1604654894610-df490651e56c?auto=format&fit=crop&q=80&w=400"
      },
      {
        "id": "serv-2",
        "loja_id": "loja-1",
        "nome": "Esmaltação em Gel",
        "preco": 90,
        "duracao": 45,
        "categoria": "Unhas",
        "imagem": "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=400"
      },
      {
        "id": "serv-3",
        "loja_id": "loja-1",
        "nome": "Extensão Volume Russo",
        "preco": 220,
        "duracao": 120,
        "categoria": "Cílios",
        "imagem": "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=400"
      },
      {
        "id": "serv-4",
        "loja_id": "loja-1",
        "nome": "Lash Lifting Premium",
        "preco": 130,
        "duracao": 60,
        "categoria": "Cílios",
        "imagem": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400"
      },
      {
        "id": "serv-5",
        "loja_id": "loja-1",
        "nome": "Design com Henna e Epilação",
        "preco": 75,
        "duracao": 30,
        "categoria": "Sobrancelha",
        "imagem": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400"
      },
      {
        "id": "serv-6",
        "loja_id": "loja-1",
        "nome": "Brown Lamination",
        "preco": 110,
        "duracao": 45,
        "categoria": "Sobrancelha",
        "imagem": "https://images.unsplash.com/photo-1626015829430-7987c4ea92fb?auto=format&fit=crop&q=80&w=400"
      },
      {
        "id": "serv-7",
        "loja_id": "loja-1",
        "nome": "Corte Design Feminino + Lavação",
        "preco": 160,
        "duracao": 60,
        "categoria": "Cabelo",
        "imagem": "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400"
      },
      {
        "id": "serv-8",
        "loja_id": "loja-1",
        "nome": "Escova Modeladora & Autoestima",
        "preco": 85,
        "duracao": 30,
        "categoria": "Cabelo",
        "imagem": "https://images.unsplash.com/photo-1605497746444-11d361501e52?auto=format&fit=crop&q=80&w=400"
      },
      {
        "id": "serv-9",
        "loja_id": "loja-1",
        "nome": "Extensão Fio a Fio Clássico",
        "preco": 150,
        "duracao": 90,
        "categoria": "Cílios",
        "imagem": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400"
      },
      {
        "id": "serv-10",
        "loja_id": "loja-1",
        "nome": "Manicure e Pedicure Conjugada",
        "preco": 80,
        "duracao": 60,
        "categoria": "Unhas",
        "imagem": "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=400"
      },
      {
        "id": "serv-11",
        "loja_id": "loja-1",
        "nome": "Design de Sobrancelhas Simples",
        "preco": 50,
        "duracao": 20,
        "categoria": "Sobrancelha",
        "imagem": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400"
      },
      {
        "id": "serv-12",
        "loja_id": "loja-1",
        "nome": "Terapia Capilar Regenerativa",
        "preco": 195,
        "duracao": 75,
        "categoria": "Cabelo",
        "imagem": "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400"
      },
      {
        "id": "serv-13",
        "loja_id": "loja-1",
        "nome": "Limpeza de Pele Profunda",
        "preco": 140,
        "duracao": 90,
        "categoria": "Estética",
        "imagem": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400"
      },
      {
        "id": "serv-14",
        "loja_id": "loja-1",
        "nome": "Massagem Facial Relaxante",
        "preco": 95,
        "duracao": 45,
        "categoria": "Estética",
        "imagem": "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=400"
      }
    ],
    "produtos": [
      {
        "id": "prod-1",
        "loja_id": "loja-1",
        "nome": "Sérum Nutritivo Pro-Growth Lash",
        "preco": 79.9,
        "estoque": 15,
        "categoria": "Cílios",
        "imagem": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=200"
      },
      {
        "id": "prod-2",
        "loja_id": "loja-1",
        "nome": "Óleo Fortalecedor de Unhas Melaleuca",
        "preco": 34.9,
        "estoque": 24,
        "categoria": "Unhas",
        "imagem": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=200"
      },
      {
        "id": "prod-3",
        "loja_id": "loja-1",
        "nome": "Glow Oil Lamination Finisher",
        "preco": 58,
        "estoque": 10,
        "categoria": "Sobrancelha",
        "imagem": "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=200"
      },
      {
        "id": "prod-4",
        "loja_id": "loja-1",
        "nome": "Leave-In Macadâmia Termoactive",
        "preco": 95,
        "estoque": 8,
        "categoria": "Cabelo",
        "imagem": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=200"
      },
      {
        "id": "prod-5",
        "loja_id": "loja-1",
        "nome": "Kit Home Care Manutenção de Cílios",
        "preco": 49.9,
        "estoque": 20,
        "categoria": "Cílios",
        "imagem": "https://images.unsplash.com/photo-1626015829430-7987c4ea92fb?auto=format&fit=crop&q=80&w=200"
      },
      {
        "id": "prod-6",
        "loja_id": "loja-1",
        "nome": "Creme Hidratante para Mãos Orquídea",
        "preco": 42,
        "estoque": 18,
        "categoria": "Unhas",
        "imagem": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=200"
      },
      {
        "id": "prod-7",
        "loja_id": "loja-1",
        "nome": "Sabonete Líquido Micelar Lash Cleanser",
        "preco": 38.5,
        "estoque": 12,
        "categoria": "Cílios",
        "imagem": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=200"
      },
      {
        "id": "prod-8",
        "loja_id": "loja-1",
        "nome": "Máscara de Nutrição Capilar Caviar",
        "preco": 120,
        "estoque": 6,
        "categoria": "Cabelo",
        "imagem": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=200"
      }
    ],
    "agendamentos": [
      {
        "id": "agend-1",
        "cliente_id": "user-cliente-1",
        "profissional_id": "prof-1",
        "servico_id": "serv-2",
        "loja_id": "loja-1",
        "data_hora": "2026-05-28 10:00",
        "status": "confirmado"
      },
      {
        "id": "agend-2",
        "cliente_id": "user-cliente-1",
        "profissional_id": "prof-2",
        "servico_id": "serv-3",
        "loja_id": "loja-1",
        "data_hora": "2026-05-28 14:30",
        "status": "confirmado"
      }
    ]
  };
}

// Helper to read DB
function getDB() {
  let db: any = { usuarios: [], lojas: [], profissionais: [], servicos: [], produtos: [], agendamentos: [] };
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, "utf-8");
      db = JSON.parse(data);
    } else {
      db = getInitialSeedData();
      saveDB(db);
      return db;
    }
  } catch (error) {
    console.error("Erro ao ler banco de dados JSON, usando defaults:", error);
    db = getInitialSeedData();
    saveDB(db);
    return db;
  }

  // Ensure all collections exist
  if (!db.usuarios) db.usuarios = [];
  if (!db.lojas) db.lojas = [];
  if (!db.profissionais) db.profissionais = [];
  if (!db.servicos) db.servicos = [];
  if (!db.produtos) db.produtos = [];
  if (!db.agendamentos) db.agendamentos = [];

  // Self-healing check: If the stored JSON is empty or missing content, inject the default templates
  let updated = false;
  const seed = getInitialSeedData();

  if (db.lojas.length === 0) {
    db.lojas = seed.lojas;
    updated = true;
  } else {
    // Ensure "nucleo-autoestima" exists in the stores list
    const hasAutoestima = db.lojas.some((l: any) => l.slug === "nucleo-autoestima" || l.id === "loja-1");
    if (!hasAutoestima) {
      db.lojas.push(seed.lojas[0]);
      updated = true;
    }
  }

  if (db.usuarios.length === 0) {
    db.usuarios = seed.usuarios;
    updated = true;
  }

  if (db.profissionais.length === 0) {
    db.profissionais = seed.profissionais;
    updated = true;
  }

  if (db.servicos.length === 0) {
    db.servicos = seed.servicos;
    updated = true;
  }

  if (db.produtos.length === 0) {
    db.produtos = seed.produtos;
    updated = true;
  }

  if (updated) {
    console.log("Banco de dados JSON inicializado ou corrigido com sucesso com dados padrão.");
    saveDB(db);
  }

  return db;
}

// Helper to write DB
function saveDB(data: any) {
  try {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Erro ao salvar no banco de dados JSON:", err);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API: Healthcheck
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API: Login
  app.post("/api/login", (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
    }

    const db = getDB();
    const user = db.usuarios.find(
      (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
    );

    if (!user) {
      return res.status(401).json({ error: "E-mail ou senha incorretos" });
    }

    // Don't send password back
    const { senha: _, ...userWithoutPassword } = user;
    return res.json({ user: userWithoutPassword });
  });

  // API: Cadastro
  app.post("/api/register", (req, res) => {
    const { nome, email, senha, tipo, loja_id, profissional_id } = req.body;
    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
    }

    const db = getDB();
    const exists = db.usuarios.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.status(400).json({ error: "Este e-mail já está cadastrado." });
    }

    const newUser = {
      id: "user-" + Date.now(),
      nome,
      email,
      senha,
      tipo, // 'admin' | 'dono' | 'profissional' | 'cliente'
      ...(loja_id ? { loja_id } : {}),
      ...(profissional_id ? { profissional_id } : {})
    };

    db.usuarios.push(newUser);
    saveDB(db);

    const { senha: _, ...userSafe } = newUser;
    return res.json({ user: userSafe });
  });

  // API: Lojas
  app.get("/api/lojas", (req, res) => {
    const db = getDB();
    res.json(db.lojas);
  });

  app.get("/api/lojas/:clientIdOrSlug", (req, res) => {
    const { clientIdOrSlug } = req.params;
    const db = getDB();
    const loja = db.lojas.find(
      (l: any) => l.id === clientIdOrSlug || l.slug === clientIdOrSlug
    );
    if (!loja) {
      return res.status(404).json({ error: "Loja não encontrada" });
    }
    // Embed linked services and professionals
    const servicos = db.servicos.filter((s: any) => s.loja_id === loja.id);
    const profissionais = db.profissionais.filter((p: any) => p.loja_id === loja.id);
    res.json({ loja, servicos, profissionais });
  });

  app.post("/api/lojas", (req, res) => {
    const { id, nome, endereco, telefone, horario_funcionamento, slug, imagem } = req.body;
    if (!nome || !endereco || !telefone) {
      return res.status(400).json({ error: "Nome, endereço e telefone são obrigatórios." });
    }

    const db = getDB();
    const finalSlug = slug || nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    if (id) {
      // Update
      const index = db.lojas.findIndex((l: any) => l.id === id);
      if (index !== -1) {
        db.lojas[index] = {
          ...db.lojas[index],
          nome,
          endereco,
          telefone,
          horario_funcionamento: horario_funcionamento || { inicio: "09:00", fim: "18:00" },
          slug: finalSlug,
          imagem: imagem || db.lojas[index].imagem || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400"
        };
        saveDB(db);
        return res.json(db.lojas[index]);
      }
      return res.status(404).json({ error: "Loja não encontrada para atualização" });
    } else {
      // Create New
      const newLoja = {
        id: "loja-" + Date.now(),
        nome,
        endereco,
        telefone,
        horario_funcionamento: horario_funcionamento || { inicio: "09:00", fim: "18:00" },
        slug: finalSlug,
        imagem: imagem || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400",
        servicos_populares: []
      };
      db.lojas.push(newLoja);
      saveDB(db);
      return res.json(newLoja);
    }
  });

  // API: Profissionais
  app.get("/api/profissionais", (req, res) => {
    const db = getDB();
    const { loja_id } = req.query;
    if (loja_id) {
      const filtered = db.profissionais.filter((p: any) => p.loja_id === loja_id);
      return res.json(filtered);
    }
    return res.json(db.profissionais);
  });

  app.post("/api/profissionais", (req, res) => {
    const { id, loja_id, nome, especialidade, foto } = req.body;
    if (!loja_id || !nome || !especialidade) {
      return res.status(400).json({ error: "Campos obrigatórios: loja_id, nome, especialidade." });
    }

    const db = getDB();
    if (id) {
      // Update
      const idx = db.profissionais.findIndex((p: any) => p.id === id);
      if (idx !== -1) {
        db.profissionais[idx] = {
          ...db.profissionais[idx],
          nome,
          especialidade,
          foto: foto || db.profissionais[idx].foto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
        };
        saveDB(db);
        return res.json(db.profissionais[idx]);
      }
      return res.status(404).json({ error: "Profissional não encontrado" });
    } else {
      // Create
      const newProf = {
        id: "prof-" + Date.now(),
        loja_id,
        nome,
        especialidade,
        foto: foto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
      };
      db.profissionais.push(newProf);
      saveDB(db);
      return res.json(newProf);
    }
  });

  app.delete("/api/profissionais/:id", (req, res) => {
    const { id } = req.params;
    const db = getDB();
    const initialLen = db.profissionais.length;
    db.profissionais = db.profissionais.filter((p: any) => p.id !== id);
    if (db.profissionais.length === initialLen) {
      return res.status(404).json({ error: "Profissional não encontrado" });
    }
    // Cancel future bookings associated with this professional if needed, or keep them with warning
    saveDB(db);
    res.json({ message: "Profissional removido com sucesso" });
  });

  // API: Serviços
  app.get("/api/servicos", (req, res) => {
    const db = getDB();
    const { loja_id } = req.query;
    if (loja_id) {
      const filtered = db.servicos.filter((s: any) => s.loja_id === loja_id);
      return res.json(filtered);
    }
    return res.json(db.servicos);
  });

  function getServiceFallbackImage(categoria: string): string {
    switch (categoria) {
      case "Unhas":
        return "https://images.unsplash.com/photo-1604654894610-df490651e56c?auto=format&fit=crop&q=80&w=400";
      case "Cílios":
        return "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=400";
      case "Sobrancelha":
        return "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400";
      case "Cabelo":
        return "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400";
      case "Estética":
      case "Estética / Spa":
        return "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400";
      default:
        return "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400";
    }
  }

  app.post("/api/servicos", (req, res) => {
    const { id, loja_id, nome, preco, duracao, categoria, imagem } = req.body;
    if (!loja_id || !nome || !preco || !duracao || !categoria) {
      return res.status(400).json({ error: "Campos obrigatórios: loja_id, nome, preco, duracao, categoria" });
    }

    const db = getDB();
    if (id) {
      const idx = db.servicos.findIndex((s: any) => s.id === id);
      if (idx !== -1) {
        db.servicos[idx] = {
          ...db.servicos[idx],
          nome,
          preco: Number(preco),
          duracao: Number(duracao),
          categoria,
          imagem: imagem || db.servicos[idx].imagem || getServiceFallbackImage(categoria)
        };
        saveDB(db);
        return res.json(db.servicos[idx]);
      }
      return res.status(404).json({ error: "Serviço não encontrado" });
    } else {
      const newServico = {
        id: "serv-" + Date.now(),
        loja_id,
        nome,
        preco: Number(preco),
        duracao: Number(duracao),
        categoria,
        imagem: imagem || getServiceFallbackImage(categoria)
      };
      db.servicos.push(newServico);
      saveDB(db);
      return res.json(newServico);
    }
  });

  app.delete("/api/servicos/:id", (req, res) => {
    const { id } = req.params;
    const db = getDB();
    const initialLen = db.servicos.length;
    db.servicos = db.servicos.filter((s: any) => s.id !== id);
    if (db.servicos.length === initialLen) {
      return res.status(404).json({ error: "Serviço não encontrado" });
    }
    saveDB(db);
    res.json({ message: "Serviço removido com sucesso" });
  });

  // API: Agendamentos
  app.get("/api/agendamentos", (req, res) => {
    const db = getDB();
    const { cliente_id, loja_id, profissional_id } = req.query;
    let list = db.agendamentos;

    if (cliente_id) {
      list = list.filter((a: any) => a.cliente_id === cliente_id);
    }
    if (loja_id) {
      list = list.filter((a: any) => a.loja_id === loja_id);
    }
    if (profissional_id) {
      list = list.filter((a: any) => a.profissional_id === profissional_id);
    }

    // Enrich response with names
    const enriched = list.map((a: any) => {
      const cliente = db.usuarios.find((u: any) => u.id === a.cliente_id);
      const profissional = db.profissionais.find((p: any) => p.id === a.profissional_id);
      const servico = db.servicos.find((s: any) => s.id === a.servico_id);
      const loja = db.lojas.find((l: any) => l.id === a.loja_id);

      return {
        ...a,
        cliente_nome: cliente ? cliente.nome : "Desconhecido",
        profissional_nome: profissional ? profissional.nome : "Desconhecido",
        servico_nome: servico ? servico.nome : "Desconhecido",
        servico_preco: servico ? servico.preco : 0,
        servico_duracao: servico ? servico.duracao : 30,
        loja_nome: loja ? loja.nome : "Lojas Inc"
      };
    });

    res.json(enriched);
  });

  app.post("/api/agendamentos", (req, res) => {
    const { cliente_id, profissional_id, servico_id, loja_id, data_hora } = req.body;
    if (!cliente_id || !profissional_id || !servico_id || !loja_id || !data_hora) {
      return res.status(400).json({ error: "Dados incompletos para agendamento" });
    }

    const db = getDB();
    const servico = db.servicos.find((s: any) => s.id === servico_id);
    if (!servico) {
      return res.status(404).json({ error: "Serviço não encontrado" });
    }

    // Agendamento Duration & Calculation
    const duracao = servico.duracao; // em minutos

    // Parse requested data_hora: Format "YYYY-MM-DD HH:mm"
    const reqStart = new Date(data_hora.replace(" ", "T"));
    if (isNaN(reqStart.getTime())) {
      return res.status(400).json({ error: "Formato de data e hora inválido." });
    }
    const reqEnd = new Date(reqStart.getTime() + duracao * 60 * 1000);

    // Business hour check
    const loja = db.lojas.find((l: any) => l.id === loja_id);
    if (loja) {
      const startHour = parseInt(loja.horario_funcionamento.inicio.split(":")[0]);
      const startMin = parseInt(loja.horario_funcionamento.inicio.split(":")[1]);
      const endHour = parseInt(loja.horario_funcionamento.fim.split(":")[0]);
      const endMin = parseInt(loja.horario_funcionamento.fim.split(":")[1]);

      const reqStartHours = reqStart.getHours();
      const reqStartMinutes = reqStart.getMinutes();
      const reqEndHours = reqEnd.getHours();
      const reqEndMinutes = reqEnd.getMinutes();

      const timeInMinutes = (h: number, m: number) => h * 60 + m;

      const shopStartMinutes = timeInMinutes(startHour, startMin);
      const shopEndMinutes = timeInMinutes(endHour, endMin);
      const appStartMinutes = timeInMinutes(reqStartHours, reqStartMinutes);
      const appEndMinutes = timeInMinutes(reqEndHours, reqEndMinutes);

      if (loja.horario_funcionamento.split_shift_enabled) {
        const breakStartHour = parseInt((loja.horario_funcionamento.intervalo_inicio || "11:40").split(":")[0]);
        const breakStartMin = parseInt((loja.horario_funcionamento.intervalo_inicio || "11:40").split(":")[1]);
        const breakEndHour = parseInt((loja.horario_funcionamento.intervalo_fim || "13:40").split(":")[0]);
        const breakEndMin = parseInt((loja.horario_funcionamento.intervalo_fim || "13:40").split(":")[1]);

        const breakStartMinutes = timeInMinutes(breakStartHour, breakStartMin);
        const breakEndMinutes = timeInMinutes(breakEndHour, breakEndMin);

        const inTurn1 = (appStartMinutes >= shopStartMinutes && appEndMinutes <= breakStartMinutes);
        const inTurn2 = (appStartMinutes >= breakEndMinutes && appEndMinutes <= shopEndMinutes);

        if (!inTurn1 && !inTurn2) {
          return res.status(400).json({
            error: `O horário selecionado (${data_hora.split(' ')[1]}) está indisponível ou cai no período de intervalo de almoço do Studio. Horários permitidos: Turno Manhã (${loja.horario_funcionamento.inicio} às ${loja.horario_funcionamento.intervalo_inicio}) | Turno Tarde (${loja.horario_funcionamento.intervalo_fim} às ${loja.horario_funcionamento.fim})`
          });
        }
      } else {
        if (appStartMinutes < shopStartMinutes || appEndMinutes > shopEndMinutes) {
          return res.status(400).json({
            error: `O horário selecionado está fora do horário de funcionamento da loja (${loja.horario_funcionamento.inicio} às ${loja.horario_funcionamento.fim})`
          });
        }
      }
    }

    // Overlap validation:
    // Check if the selected professional is occupied at that time
    const profissionalBookings = db.agendamentos.filter(
      (a: any) => a.profissional_id === profissional_id && a.status === "confirmado"
    );

    for (const appt of profissionalBookings) {
      const apptServico = db.servicos.find((s: any) => s.id === appt.servico_id);
      const apptDur = apptServico ? apptServico.duracao : 30;

      const apptStart = new Date(appt.data_hora.replace(" ", "T"));
      const apptEnd = new Date(apptStart.getTime() + apptDur * 60 * 1000);

      // Overlap condition:
      // reqStart < apptEnd AND reqEnd > apptStart
      if (reqStart < apptEnd && reqEnd > apptStart) {
        return res.status(400).json({
          error: "Infelizmente este profissional já possui um agendamento conflitante neste horário. Selecione outro horário."
        });
      }
    }

    // Valid: create booking!
    const newAgendamento = {
      id: "agend-" + Date.now(),
      cliente_id,
      profissional_id,
      servico_id,
      loja_id,
      data_hora,
      status: "confirmado"
    };

    db.agendamentos.push(newAgendamento);
    saveDB(db);

    // Simulated Trigger Notification (Printed state for demonstration)
    console.log(`[NOTIFICAÇÃO SIMULADA] Confirmado: Agendamento ${newAgendamento.id} para o cliente ${cliente_id} com o profissional ${profissional_id} em ${data_hora}.`);

    res.json({
      success: true,
      agendamento: newAgendamento,
      message: "Agendamento confirmado com sucesso! Notificação enviada por WhatsApp (Simulação)."
    });
  });

  app.post("/api/agendamentos/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // 'cancelado' | 'confirmado'
    const db = getDB();

    const appt = db.agendamentos.find((a: any) => a.id === id);
    if (!appt) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    appt.status = status;
    saveDB(db);
    res.json(appt);
  });

  // Admin Dashboard - Metrics Endpoint
  app.get("/api/admin/metrics", (req, res) => {
    const db = getDB();
    const lojasCount = db.lojas.length;
    const usuariosCount = db.usuarios.length;
    const agendamentosCount = db.agendamentos.length;
    const confirmados = db.agendamentos.filter((a: any) => a.status === "confirmado").length;
    const cancelados = db.agendamentos.filter((a: any) => a.status === "cancelado").length;

    // Billing estimation (sum of confirmed)
    let totalFaturamento = 0;
    db.agendamentos.forEach((a: any) => {
      if (a.status === "confirmado") {
        const servico = db.servicos.find((s: any) => s.id === a.servico_id);
        if (servico) {
          totalFaturamento += servico.preco;
        }
      }
    });

    res.json({
      lojasCount,
      usuariosCount,
      agendamentosCount,
      statusRatio: { confirmados, cancelados },
      totalFaturamento
    });
  });

  // User list endpoint (Admin management)
  app.get("/api/admin/usuarios", (req, res) => {
    const db = getDB();
    const safeUsers = db.usuarios.map(({ senha: _, ...user }: any) => user);
    res.json(safeUsers);
  });

  app.delete("/api/admin/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const db = getDB();
    db.usuarios = db.usuarios.filter((u: any) => u.id !== id);
    saveDB(db);
    res.json({ message: "Usuário removido com sucesso." });
  });

  // API: Produtos Catalogue
  app.get("/api/produtos", (req, res) => {
    const db = getDB();
    const { loja_id } = req.query;
    let list = db.produtos || [];
    if (loja_id) {
      list = list.filter((p: any) => p.loja_id === loja_id);
    }
    res.json(list);
  });

  app.post("/api/produtos", (req, res) => {
    const { id, loja_id, nome, preco, estoque, categoria, imagem } = req.body;
    if (!loja_id || !nome || !preco) {
      return res.status(400).json({ error: "Campos obrigatórios de produto: loja_id, nome, preco." });
    }

    const db = getDB();
    if (!db.produtos) {
      db.produtos = [];
    }

    if (id) {
      const idx = db.produtos.findIndex((p: any) => p.id === id);
      if (idx !== -1) {
        db.produtos[idx] = {
          ...db.produtos[idx],
          nome,
          preco: Number(preco),
          estoque: Number(estoque || 0),
          categoria: categoria || "Outros",
          imagem: imagem || "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=200"
        };
        saveDB(db);
        return res.json(db.produtos[idx]);
      }
      return res.status(404).json({ error: "Produto não encontrado para atualizar." });
    } else {
      const newProduct = {
        id: "prod-" + Date.now(),
        loja_id,
        nome,
        preco: Number(preco),
        estoque: Number(estoque || 0),
        categoria: categoria || "Outros",
        imagem: imagem || "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=200"
      };
      db.produtos.push(newProduct);
      saveDB(db);
      return res.json(newProduct);
    }
  });

  app.delete("/api/produtos/:id", (req, res) => {
    const { id } = req.params;
    const db = getDB();
    if (!db.produtos) db.produtos = [];
    const initialLen = db.produtos.length;
    db.produtos = db.produtos.filter((p: any) => p.id !== id);
    if (db.produtos.length === initialLen) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    saveDB(db);
    res.json({ message: "Produto removido com sucesso." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer();
