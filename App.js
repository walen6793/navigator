
import React, { useMemo, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,
  SectionList, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


class Course {
  constructor(code, name, credits = 3, section = '01') {
    this.code = code;
    this.name = name;
    this.credits = credits;
    this.section = section;
  }
}

class SemesterRegistration {
  constructor(term, courses = []) {
    this.term = term;           
    this.courses = courses;     
  }
  addCourse(course) {
    this.courses.push(course);
  }
  totalCredits() {
    return this.courses.reduce((s, c) => s + (c.credits || 0), 0);
  }
}

class Student {
  constructor({ firstName, lastName, studentId, major, school, imageUrl, registrations = [] }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.studentId = studentId;
    this.major = major;
    this.school = school;
    this.imageUrl = imageUrl;
    this.registrations = registrations; 
  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}



const seedStudent = new Student({
  firstName: 'วาเลน',
  lastName: 'ทิพย์มาศ',
  studentId: 'ุ66110446',
  major: 'เทคโนโลยีสารสนเทศและนวัตกรรมดิจิทัล',
  school: 'สำนักวิชาเทคโนโลยีสารสนเทศ',
  imageUrl:
    'https://cdn-icons-png.flaticon.com/512/3534/3534172.png',
  registrations: [
    new SemesterRegistration('1/2025', [
      new Course('ITD62-322', 'Mobile Development', 3, '01'),
      new Course('GEN61-151', 'English for Communication', 3, '02'),
    ]),
    new SemesterRegistration('2/2025', [
      new Course('ITD62-331', 'Internet of Things', 3, '01'),
      new Course('ITD62-355', 'Cloud & DevOps Basics', 3, '01'),
    ]),
  ],
});


const theme = {
  primary: '#007AFF',
  surface: '#ffffff',
  section: '#eaf4ff',
  bg: '#f5f9ff',
  text: '#333',
  sub: '#666',
};


function InfoItem({ icon, label, value }) {
  return (
    <View style={styles.infoItem}>
      <Ionicons name={icon} size={20} color={theme.primary} style={{ marginRight: 10 }} />
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}


function StudentInfoScreen({ navigation }) {
  const s = seedStudent;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <ScrollView style={styles.container}>
        <View style={styles.profileCard}>
          <Image source={{ uri: s.imageUrl }} style={styles.avatarLarge} />
          <Text style={styles.nameText}>{s.fullName}</Text>
          <Text style={styles.studentIdText}>รหัสนักศึกษา: {s.studentId}</Text>
        </View>

        <View style={styles.infoSection}>
          <InfoItem icon="school-outline" label="สำนักวิชา" value={s.school} />
          <InfoItem icon="briefcase-outline" label="สาขา" value={s.major} />
        </View>

        <TouchableOpacity
          testID="to-registration"
          style={styles.button}
          onPress={() =>
            navigation.navigate('RegisteredCourses', {
              registrations: s.registrations,
              banner:
                'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop',
            })
          }
        >
          <Ionicons name="book-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>ดูรายวิชาที่ลงทะเบียน</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


function RegisteredCoursesScreen({ route }) {
  const { registrations, banner } = route.params;
  const [expanded, setExpanded] = useState(() =>
    Object.fromEntries(registrations.map((r) => [r.term, true]))
  );

  const sections = useMemo(
    () =>
      registrations.map((reg) => ({
        term: reg.term,
        totalCredits: reg.totalCredits(),
        data: expanded[reg.term] ? reg.courses : [], 
      })),
    [registrations, expanded]
  );

  const toggle = useCallback((term) => {
    setExpanded((p) => ({ ...p, [term]: !p[term] }));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 8 }}>
        {banner ? (
          <Image source={{ uri: banner }} style={styles.banner} resizeMode="cover" />
        ) : null}
        <SectionList
          contentContainerStyle={styles.sectionListContainer}
          sections={sections}
          keyExtractor={(item, idx) => `${item.code}-${idx}`}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }) => (
            <TouchableOpacity style={styles.sectionHeader} onPress={() => toggle(section.term)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons
                  name={expanded[section.term] ? 'chevron-down' : 'chevron-forward'}
                  size={18}
                  color={theme.primary}
                />
                <Text style={styles.termTitle}>ภาคเรียน {section.term}</Text>
              </View>
              <Text style={styles.termMeta}>
                วิชา {registrations.find((r) => r.term === section.term)?.courses.length || 0} รายการ •
                หน่วยกิตรวม {section.totalCredits}
              </Text>
            </TouchableOpacity>
          )}
          renderItem={({ item }) => (
            <View style={styles.courseItem}>
              <Ionicons name="book-outline" size={18} color={theme.primary} />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.courseName}>{item.code} - {item.name}</Text>
                <Text style={styles.courseSub}>ตอนเรียน: {item.section} • {item.credits} หน่วยกิต</Text>
              </View>
            </View>
          )}
          renderSectionFooter={() => <View style={{ height: 8 }} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: theme.bg } }}>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="StudentInfo" component={StudentInfoScreen} options={{ title: 'ข้อมูลนักศึกษา' }} />
        <Stack.Screen name="RegisteredCourses" component={RegisteredCoursesScreen} options={{ title: 'รายวิชาที่ลงทะเบียน' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: theme.bg, padding: 20 },
  profileCard: {
    alignItems: 'center', backgroundColor: theme.section, borderRadius: 16,
    padding: 24, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 3,
  },
  avatarLarge: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  nameText: { fontSize: 22, fontWeight: '700', color: theme.text },
  studentIdText: { fontSize: 14, color: theme.sub, marginTop: 4 },

  infoSection: { backgroundColor: theme.surface, padding: 16, borderRadius: 12, marginBottom: 20 },
  infoItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  label: { fontSize: 13, color: theme.sub },
  value: { fontSize: 16, fontWeight: '600', color: theme.text },

  button: {
    flexDirection: 'row', backgroundColor: theme.primary, borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'space-between',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16, flex: 1, textAlign: 'center' },

  banner: { width: '100%', height: 140, borderRadius: 12, marginHorizontal: 20, marginTop: 12 },
  sectionListContainer: { padding: 20 },
  sectionHeader: {
    backgroundColor: theme.surface, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14,
    marginTop: 12, borderLeftWidth: 4, borderLeftColor: theme.primary,
  },
  termTitle: { fontSize: 16, fontWeight: '700', color: '#1549a1', marginLeft: 4 },
  termMeta: { marginTop: 4, fontSize: 12, color: theme.sub },

  courseItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff',
    padding: 12, borderRadius: 10, marginTop: 8,
    shadowColor: '#000', shadowOpacity: 0.03, shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, elevation: 1,
  },
  courseName: { fontSize: 14, color: theme.text, fontWeight: '600' },
  courseSub: { fontSize: 12, color: theme.sub, marginTop: 2 },
});
