
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      password: adminPassword,
      role: 'admin',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User',
      department: 'Administration',
      isActive: true
    }
  });

  // Create interviewer user
  const interviewerPassword = await bcrypt.hash('interviewer123', 10);
  
  await prisma.user.upsert({
    where: { email: 'interviewer@example.com' },
    update: {},
    create: {
      email: 'interviewer@example.com',
      firstName: 'Test',
      lastName: 'Interviewer',
      password: interviewerPassword,
      role: 'interviewer',
      avatar: 'https://ui-avatars.com/api/?name=Test+Interviewer',
      department: 'Engineering',
      isActive: true
    }
  });

  // Create sample candidates
  const candidates = [
    {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      phone: '555-123-4567',
      status: 'Technical',
      position: 'Frontend Developer',
      department: 'Engineering',
      source: 'LinkedIn',
      appliedDate: '2023-06-15'
    },
    {
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@example.com',
      phone: '555-234-5678',
      status: 'Cultural',
      position: 'Product Manager',
      department: 'Product',
      source: 'Referral',
      appliedDate: '2023-06-20'
    },
    {
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@example.com',
      phone: '555-345-6789',
      status: 'Applied',
      position: 'UX Designer',
      department: 'Design',
      source: 'Website',
      appliedDate: '2023-07-01'
    }
  ];

  for (const candidate of candidates) {
    const createdCandidate = await prisma.candidate.upsert({
      where: { email: candidate.email },
      update: {},
      create: {
        ...candidate,
        skills: {
          create: [
            { name: 'JavaScript', category: 'Programming' },
            { name: 'React', category: 'Framework' }
          ]
        }
      }
    });
    
    // Create a sample interview for this candidate
    await prisma.interview.create({
      data: {
        candidateId: createdCandidate.id,
        candidateName: `${createdCandidate.firstName} ${createdCandidate.lastName}`,
        position: createdCandidate.position,
        type: 'Technical',
        status: 'Scheduled',
        date: '2023-07-15',
        startTime: '10:00 AM',
        endTime: '11:00 AM',
        interviewers: ['John Doe', 'Jane Smith'],
        location: 'Conference Room A',
        timeZone: 'UTC-5'
      }
    });
  }

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
