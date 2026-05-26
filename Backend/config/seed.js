const User = require('../models/User');

const seedAdmin = async () => {
  try {
    const adminEmail = 'dev.obsidiansix@gmail.com';
    const adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      console.log('🌱 Admin user not found. Seeding admin user...');
      await User.create({
        name: 'Admin Dev',
        email: adminEmail,
        password: 'admin@obs',
        role: 'admin',
      });
      console.log('✅ Admin user successfully seeded!');
    } else {
      // If admin user exists, ensure they have the correct password and role
      console.log('ℹ️ Admin user already exists.');
      // Optionally update if details need synchronization:
      if (adminUser.role !== 'admin') {
        adminUser.role = 'admin';
        await adminUser.save();
        console.log('🔧 Updated admin user role to admin.');
      }
    }
  } catch (error) {
    console.error('❌ Error seeding admin user:', error.message);
  }
};

module.exports = seedAdmin;
