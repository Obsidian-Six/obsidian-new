const User = require('../models/User');

// Creates or updates the admin account from environment variables.
// Set ADMIN_EMAIL and ADMIN_PASSWORD in Backend/.env. Changing ADMIN_PASSWORD
// and restarting the backend resets the admin password.
const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'dev.obsidiansix@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminUser = await User.findOne({ email: adminEmail }).select('+password');

    if (!adminUser) {
      if (!adminPassword) {
        console.warn('⚠️ No admin user and ADMIN_PASSWORD is not set. Skipping admin seed.');
        return;
      }
      await User.create({ name: 'Admin', email: adminEmail, password: adminPassword, role: 'admin' });
      console.log('✅ Admin user created.');
      return;
    }

    let changed = false;
    if (adminUser.role !== 'admin') {
      adminUser.role = 'admin';
      changed = true;
    }
    if (adminPassword && !(await adminUser.matchPassword(adminPassword))) {
      adminUser.password = adminPassword;
      changed = true;
      console.log('🔑 Admin password updated from ADMIN_PASSWORD.');
    }
    if (changed) await adminUser.save();
  } catch (error) {
    console.error('❌ Error seeding admin user:', error.message);
  }
};

module.exports = seedAdmin;
