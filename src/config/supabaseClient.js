import { Sequelize } from 'sequelize';
import pg from 'pg';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config();

// Ganti connection string sesuai Supabase
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export default sequelize;