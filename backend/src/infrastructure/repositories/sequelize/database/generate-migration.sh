#!/bin/bash
cat > ./migrations/$(date +"%Y%m%d%H%M%S")-$1.ts << EOF
import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    // Write migration code here.
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    // Rollback your migration changes.
  },
};
EOF
