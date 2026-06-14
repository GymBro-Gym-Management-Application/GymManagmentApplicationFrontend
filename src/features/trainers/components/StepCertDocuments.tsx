import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { TrainerPayload, Certification, Document } from '../types/trainer.types';
import { SectionTitle, RowGrid, GridCell } from './FormFields';
import GlassCard from './GlassCard';
import { T } from './theme';

interface Props {
  data: Partial<TrainerPayload>;
  onChange: (fields: Partial<TrainerPayload>) => void;
}

const emptyCert = (): Certification => ({
  certificateName: '', certificateNumber: '', issuedBy: '', issueDate: '', expiryDate: '', documentUrl: '',
});
const emptyDoc = (): Document => ({
  documentType: '', documentNumber: '', documentUrl: '', expiryDate: '',
});

function CardField({ label, value, onChangeText }: { label: string; value: string; onChangeText: (v: string) => void }) {
  return (
    <View style={cf.wrap}>
      <Text style={cf.label}>{label}</Text>
      <TextInput style={cf.input} value={value} onChangeText={onChangeText} placeholder={label} placeholderTextColor={T.mutedFg} />
    </View>
  );
}

export default function StepCertDocuments({ data, onChange }: Props) {
  const certs = data.certifications ?? [];
  const docs = data.documents ?? [];

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

      <GlassCard style={s.sectionCard}>
        <SectionTitle icon="🎖">Certifications</SectionTitle>
        <Text style={s.hint}>Add professional certifications and qualifications.</Text>
      </GlassCard>

      {certs.map((cert, i) => (
        <GlassCard key={i} style={s.itemCard} elevated>
          <View style={s.itemHeader}>
            <View style={s.itemNumRow}>
              <Text style={s.itemDot}>🎖</Text>
              <Text style={s.itemNum}>CERT {i + 1}</Text>
            </View>
            <TouchableOpacity onPress={() => onChange({ certifications: certs.filter((_, idx) => idx !== i) })} style={s.removeBtn}>
              <Text style={s.removeTxt}>🗑 Remove</Text>
            </TouchableOpacity>
          </View>
          <CardField label="Certificate Name" value={cert.certificateName} onChangeText={(v) => onChange({ certifications: certs.map((c, idx) => idx === i ? { ...c, certificateName: v } : c) })} />
          <CardField label="Certificate Number" value={cert.certificateNumber} onChangeText={(v) => onChange({ certifications: certs.map((c, idx) => idx === i ? { ...c, certificateNumber: v } : c) })} />
          <CardField label="Issued By" value={cert.issuedBy} onChangeText={(v) => onChange({ certifications: certs.map((c, idx) => idx === i ? { ...c, issuedBy: v } : c) })} />
          <RowGrid>
            <GridCell>
              <CardField label="Issue Date" value={cert.issueDate} onChangeText={(v) => onChange({ certifications: certs.map((c, idx) => idx === i ? { ...c, issueDate: v } : c) })} />
            </GridCell>
            <GridCell>
              <CardField label="Expiry Date" value={cert.expiryDate} onChangeText={(v) => onChange({ certifications: certs.map((c, idx) => idx === i ? { ...c, expiryDate: v } : c) })} />
            </GridCell>
          </RowGrid>
          <CardField label="Document URL" value={cert.documentUrl} onChangeText={(v) => onChange({ certifications: certs.map((c, idx) => idx === i ? { ...c, documentUrl: v } : c) })} />
        </GlassCard>
      ))}

      <TouchableOpacity style={s.addBtn} onPress={() => onChange({ certifications: [...certs, emptyCert()] })} activeOpacity={0.7}>
        <Text style={s.addBtnText}>＋  Add Certification</Text>
      </TouchableOpacity>

      <GlassCard style={s.sectionCard}>
        <SectionTitle icon="📁">Documents</SectionTitle>
        <Text style={s.hint}>Upload identity, address, or other documents.</Text>
      </GlassCard>

      {docs.map((doc, i) => (
        <GlassCard key={i} style={s.itemCard} elevated>
          <View style={s.itemHeader}>
            <View style={s.itemNumRow}>
              <Text style={s.itemDotAmber}>📄</Text>
              <Text style={[s.itemNum, { color: T.accent }]}>DOC {i + 1}</Text>
            </View>
            <TouchableOpacity onPress={() => onChange({ documents: docs.filter((_, idx) => idx !== i) })} style={s.removeBtn}>
              <Text style={s.removeTxt}>🗑 Remove</Text>
            </TouchableOpacity>
          </View>
          <RowGrid>
            <GridCell>
              <CardField label="Document Type" value={doc.documentType} onChangeText={(v) => onChange({ documents: docs.map((d, idx) => idx === i ? { ...d, documentType: v } : d) })} />
            </GridCell>
            <GridCell>
              <CardField label="Document Number" value={doc.documentNumber} onChangeText={(v) => onChange({ documents: docs.map((d, idx) => idx === i ? { ...d, documentNumber: v } : d) })} />
            </GridCell>
          </RowGrid>
          <CardField label="Document URL" value={doc.documentUrl} onChangeText={(v) => onChange({ documents: docs.map((d, idx) => idx === i ? { ...d, documentUrl: v } : d) })} />
          <CardField label="Expiry Date (YYYY-MM-DD)" value={doc.expiryDate} onChangeText={(v) => onChange({ documents: docs.map((d, idx) => idx === i ? { ...d, expiryDate: v } : d) })} />
        </GlassCard>
      ))}

      <TouchableOpacity style={[s.addBtn, s.addBtnAmber]} onPress={() => onChange({ documents: [...docs, emptyDoc()] })} activeOpacity={0.7}>
        <Text style={[s.addBtnText, { color: T.accent }]}>＋  Add Document</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.background },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, gap: 12 },
  sectionCard: { padding: 18 },
  hint: { fontSize: 12, color: T.mutedFg, marginTop: 2 },
  itemCard: { padding: 16 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  itemNumRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  itemDot: { fontSize: 13 },
  itemDotAmber: { fontSize: 13 },
  itemNum: { fontSize: 11, fontWeight: '800', color: T.primary, letterSpacing: 1.5 },
  removeBtn: { paddingHorizontal: 4 },
  removeTxt: { fontSize: 12, color: T.destructive, fontWeight: '600' },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: T.neonBorder, borderRadius: 12,
    padding: 14, backgroundColor: T.neonGlowFaint,
  },
  addBtnAmber: { borderColor: `${T.accent}55`, backgroundColor: `${T.accent}10` },
  addBtnText: { color: T.primary, fontWeight: '700', fontSize: 14 },
});

const cf = StyleSheet.create({
  wrap: { marginBottom: 12 },
  label: { fontSize: 11, fontWeight: '700', color: T.mutedFg, marginBottom: 5, letterSpacing: 0.8, textTransform: 'uppercase' },
  input: {
    backgroundColor: T.input, borderWidth: 1, borderColor: T.border,
    borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10,
    fontSize: 14, color: T.foreground,
  },
});
