---
title: "G-code Detective Activity Dataset"
topic: "Prompt Engineering in CNC Manufacturing"
target_audience: "AI Assistants / LLMs acting as CNC Copilots"
language: "Thai / G-code"
---

# โครงสร้างข้อมูลกิจกรรมนักสืบ G-code (G-code Detective Activity)
เอกสารนี้ถูกจัดทำขึ้นเพื่อให้ AI สามารถทำความเข้าใจ บริบท (Context) บทบาท (Role) และชุดข้อมูล (Dataset) สำหรับใช้ในการฝึกสอนหรือทดสอบนักศึกษาแผนกช่างกลโรงงาน ในหัวข้อการเขียน Prompt เพื่อตรวจสอบข้อผิดพลาดของ G-code

<system_instructions>
คุณคือ "ผู้เชี่ยวชาญด้านการเขียนโปรแกรม CNC (CNC Milling Expert)" และทำหน้าที่เป็น "ผู้ช่วยตรวจสอบโค้ด (AI Copilot)" 
เมื่อผู้ใช้ป้อนชุดคำสั่ง G-code ให้คุณ คุณต้องวิเคราะห์ตามขั้นตอนต่อไปนี้:
1. อธิบายการทำงานของโค้ดแต่ละบรรทัดอย่างย่อ
2. ตรวจสอบข้อผิดพลาดทางไวยากรณ์ (Syntax Errors) หรือพารามิเตอร์ที่ผิดปกติ (Parameter Anomalies)
3. ประเมินความเสี่ยงต่อความปลอดภัย (เช่น การชนชิ้นงาน, ทูลหัก, หรือข้อจำกัดทางกลไก)
4. หากพบข้อผิดพลาด ให้เสนอแนะวิธีแก้ไข (Correction/Recommendation) พร้อมระบุเหตุผลทางวิศวกรรม
</system_instructions>

<context>
- เครื่องจักร: เครื่องกัด CNC (CNC Milling Machine)
- วัสดุชิ้นงาน: อลูมิเนียมอัลลอย (Aluminum Alloy)
- เครื่องมือตัด: ดอกเอ็นมิล (Endmill) ขนาดเส้นผ่านศูนย์กลาง 10 mm
- ระบบควบคุม: มาตรฐาน Fanuc / ISO G-code
</context>

<dataset>
ชุดข้อมูลด้านล่างรวม G-code จำนวน 40 ชุด จาก 2 ชุดข้อมูล โดยรายการ 1-20 มาจากชุดที่ 1 และรายการ 21-40 มาจากชุดที่ 2 แต่ละชุดประกอบด้วยตัวอย่างปกติและตัวอย่างที่แฝงข้อผิดพลาด/ความเสี่ยง (Ground Truth)

## ชุดคำสั่งปกติ (Normal / Safe G-code)
ชุดคำสั่งเหล่านี้ถูกต้องตามหลักไวยากรณ์และปลอดภัยในการทำงานเบื้องต้น

<item id="1">
  <gcode>
  T01 M06;
  G90 G54 G00 X0 Y0;
  M03 S2000;
  </gcode>
  <ground_truth>เปลี่ยนเป็นทูลหมายเลข 1, ใช้ระบบพิกัดสัมบูรณ์ Work Offset G54, วิ่งเร็วไปที่ X0 Y0 และเปิดสปินเดิลหมุนตามเข็มนาฬิกา 2000 รอบ/นาที</ground_truth>
</item>

<item id="2">
  <gcode>
  G43 H01 Z50.0;
  M08;
  </gcode>
  <ground_truth>เรียกใช้ค่าชดเชยความยาวทูล H01 โดยให้ปลายทูลหยุดอยู่ที่ Z50.0 เหนือชิ้นงาน และเปิดน้ำหล่อเย็น</ground_truth>
</item>

<item id="3">
  <gcode>
  G01 Z-2.0 F150;
  G01 X50.0 Y50.0 F300;
  </gcode>
  <ground_truth>กินลงเนื้อวัสดุลึก 2 มม. ด้วยอัตราป้อน 150 จากนั้นเดินตัดเฉียงไปที่พิกัด X50 Y50 ด้วยอัตราป้อน 300</ground_truth>
</item>

<item id="4">
  <gcode>
  G02 X20.0 Y20.0 R10.0 F200;
  </gcode>
  <ground_truth>เดินกัดโค้งตามเข็มนาฬิกาไปที่พิกัด X20 Y20 ด้วยรัศมีส่วนโค้ง 10 มม. อัตราป้อน 200</ground_truth>
</item>

<item id="5">
  <gcode>
  G41 D01 G01 X10.0 Y0.0 F250;
  G01 X50.0;
  </gcode>
  <ground_truth>เปิดการชดเชยรัศมีทูลฝั่งซ้าย (D01) ขณะเดินตัดเข้าหาพิกัด X10 จากนั้นเดินตัดไปที่ X50</ground_truth>
</item>

<item id="6">
  <gcode>
  G83 Z-20.0 R2.0 Q5.0 F100;
  </gcode>
  <ground_truth>วัฏจักรเจาะรูคายเศษ (Peck Drilling) ลึก -20 มม. ถอยคายเศษที่ R2.0 มม. และเจาะลงทีละ 5 มม.</ground_truth>
</item>

<item id="7">
  <gcode>
  G81 Z-10.0 R2.0 F150;
  X20.0 Y20.0;
  </gcode>
  <ground_truth>วัฏจักรเจาะรูปกติ ลึก 10 มม. รูแรกที่ตำแหน่งปัจจุบัน และไปเจาะรูที่สองที่พิกัด X20 Y20</ground_truth>
</item>

<item id="8">
  <gcode>
  G80 G00 Z50.0;
  </gcode>
  <ground_truth>ยกเลิกวัฏจักรการเจาะรู และยกทูลขึ้นด้วยความเร็วสูงสุดไปที่ Z50.0 เพื่อความปลอดภัย</ground_truth>
</item>

<item id="9">
  <gcode>
  G04 P2000;
  </gcode>
  <ground_truth>สั่งให้เครื่องหยุดนิ่ง (Dwell Time) เป็นเวลา 2,000 มิลลิวินาที (2 วินาที)</ground_truth>
</item>

<item id="10">
  <gcode>
  G28 G91 Z0.0;
  M05;
  M09;
  M30;
  </gcode>
  <ground_truth>ยกแกน Z กลับจุดอ้างอิงเครื่องจักร (Home), ปิดสปินเดิล, ปิดน้ำหล่อเย็น, และจบโปรแกรม</ground_truth>
</item>


## ชุดคำสั่งนักสืบ (Anomalous / Dangerous G-code)
ชุดคำสั่งเหล่านี้มีข้อผิดพลาดทางไวยากรณ์ หรือมีความเสี่ยงสูงที่จะทำให้เกิดอันตรายต่อเครื่องจักรและชิ้นงาน

<item id="11">
  <gcode>
  G90 G54 G00 X0 Y0;
  G00 Z-10.0;
  </gcode>
  <anomaly_type>Crash Risk</anomaly_type>
  <ground_truth>การใช้ G00 (Rapid Traverse) เคลื่อนที่ลงไปที่ Z-10.0 (ในเนื้อชิ้นงาน) จะทำให้ทูลกระแทกชิ้นงานแตกหัก ต้องเปลี่ยนเป็น G01 Z-10.0 F...</ground_truth>
</item>

<item id="12">
  <gcode>
  M03 S1500;
  G01 Z-15.0 F10;
  </gcode>
  <anomaly_type>Tool Breakage Risk</anomaly_type>
  <ground_truth>เจาะลงทีเดียวลึก 15 มม. ด้วย Feed ที่ช้ามาก (F10) เศษโลหะจะอุดตันและทำให้ดอกเอ็นมิลหัก ควรใช้วิธีเจาะลงแบบ Ramping หรือเพิ่มความเร็วอัตราป้อน</ground_truth>
</item>

<item id="13">
  <gcode>
  G90 G00 X10.0 Y10.0;
  G01 X50.0 Y10.0;
  </gcode>
  <anomaly_type>Syntax Error (Missing Parameter)</anomaly_type>
  <ground_truth>บรรทัด G01 ไม่มีการระบุค่า F (Feed rate) เครื่องจักรจะแจ้งเตือน Alarm และหยุดทำงาน</ground_truth>
</item>

<item id="14">
  <gcode>
  T01 M06;
  M04 S2500;
  G01 X20.0 F300;
  </gcode>
  <anomaly_type>Wrong Spindle Direction</anomaly_type>
  <ground_truth>ดอกเอ็นมิลถูกออกแบบมาให้ตัดเฉือนแบบตามเข็มนาฬิกา (M03) การสั่ง M04 (ทวนเข็มนาฬิกา) จะทำให้สันคมตัดไม่กินเนื้องาน เกิดการเสียดสีจนทูลไหม้</ground_truth>
</item>

<item id="15">
  <gcode>
  G01 X10.0 Y10.0 F200;
  G02 X30.0 Y30.0 F200;
  </gcode>
  <anomaly_type>Syntax Error (Incomplete Circular Parameter)</anomaly_type>
  <ground_truth>คำสั่ง G02 (เดินโค้ง) จำเป็นต้องมีจุดศูนย์กลางส่วนโค้ง (I, J) หรือรัศมี (R) กำกับด้วยเสมอ โค้ดนี้จะทำให้เครื่อง Error</ground_truth>
</item>

<item id="16">
  <gcode>
  G90 G54 X0 Y0;
  G84 Z-15.0 R5.0 S5000 F200;
  </gcode>
  <anomaly_type>High Speed Tapping Crash</anomaly_type>
  <ground_truth>G84 คือวัฏจักรต๊าปเกลียว การใช้รอบสปินเดิลสูงถึง S5000 เร็วเกินไปมาก ดอกต๊าปจะหักคาชิ้นงานทันที ควรใช้รอบต่ำให้สัมพันธ์กับระยะพิตช์</ground_truth>
</item>

<item id="17">
  <gcode>
  G91 G54 G00 X0 Y0;
  </gcode>
  <anomaly_type>Wrong Coordinate System</anomaly_type>
  <ground_truth>การใช้ G91 (แบบสัมพัทธ์) ร่วมกับ X0 Y0 หมายถึงให้ขยับไป 0 มม. จากจุดเดิม ทูลจะไม่มีการเคลื่อนที่ หากต้องการไปจุดศูนย์ของ G54 ต้องใช้ G90</ground_truth>
</item>

<item id="18">
  <gcode>
  G00 X-20.0 Y-20.0;
  G41 D01 G00 X0.0 Y0.0;
  </gcode>
  <anomaly_type>Compensation on Rapid</anomaly_type>
  <ground_truth>ห้ามเปิดการชดเชยรัศมีทูล (G41) พร้อมกับคำสั่งวิ่งเร็ว G00 เพราะเครื่องอาจกระตุกเข้าหาชิ้นงานอย่างรุนแรง ต้องใช้ร่วมกับคำสั่ง G01 เสมอ</ground_truth>
</item>

<item id="19">
  <gcode>
  G83 Z-20.0 R2.0 Q5.0 F150;
  X10. Y10.;
  G81 G00 Z50.0;
  </gcode>
  <anomaly_type>Wrong Cancel Cycle</anomaly_type>
  <ground_truth>ต้องการยกเลิกวัฏจักรเจาะรู แต่ใช้คำสั่งผิดเป็น G81 (วัฏจักรเจาะปกติ) คำสั่งที่ถูกต้องสำหรับการยกเลิกคือ G80</ground_truth>
</item>

<item id="20">
  <gcode>
  G18;
  G02 X20.0 Y20.0 R10.0 F200;
  </gcode>
  <anomaly_type>Plane Selection Conflict</anomaly_type>
  <ground_truth>G18 คือการกำหนดการทำงานในระนาบ X-Z แต่คำสั่งต่อมา (G02) สั่งเดินโค้งในพิกัด X-Y ซึ่งขัดแย้งกัน เครื่องจะไม่สามารถสร้างส่วนโค้งได้ ต้องแก้เป็น G17</ground_truth>
</item>

## ชุดข้อมูลที่ 2 (รายการ 21-40)

### ชุดคำสั่งปกติ (21-30)

<item id="21">
<gcode>
G01 X100.0 Y0.0 F400;
</gcode>
<ground_truth>
(Safe) เดินตัดเป็นเส้นตรงไปที่พิกัด X100.0 Y0.0 ด้วยอัตราป้อน 400 มม./นาที
</ground_truth>
</item>

<item id="22">
<gcode>
M03 S1200;
G04 P1000;
M03 S2000;
</gcode>
<ground_truth>
(Safe) เปิดสปินเดิลที่ 1200 รอบ/นาที, หยุดรอ 1 วินาที (1000 มิลลิวินาที) เพื่อให้ความเร็วคงที่, จากนั้นเพิ่มความเร็วเป็น 2000 รอบ/นาที
</ground_truth>
</item>

<item id="23">
<gcode>
M98 P1000 L5;
</gcode>
<ground_truth>
(Safe) เรียกใช้งานโปรแกรมย่อย (Sub-program) หมายเลข O1000 และให้ทำซ้ำจำนวน 5 รอบ (Loop)
</ground_truth>
</item>

<item id="24">
<gcode>
M29 S400;
G84 Z-10.0 R5.0 F400;
</gcode>
<ground_truth>
(Safe) วัฏจักรต๊าปเกลียวแบบแข็ง (Rigid Tapping) ใช้สปินเดิล 400 รอบ/นาที เจาะลึก -10.0 มม. ด้วย Feed 400 (ระยะพิตช์ = 1.0 มม.)
</ground_truth>
</item>

<item id="25">
<gcode>
G41 D02 G01 X20.0 Y20.0 F200;
</gcode>
<ground_truth>
(Safe) เปิดชดเชยรัศมีทูลฝั่งซ้าย โดยดึงค่าจาก Offset หมายเลข 2 ขณะเดินตัดเข้าหาพิกัด X20.0 Y20.0
</ground_truth>
</item>

<item id="26">
<gcode>
G00 Z50.0;
G00 X0 Y0;
</gcode>
<ground_truth>
(Safe) ยกทูลขึ้นในแกน Z ไปที่ระยะปลอดภัย 50 มม. ก่อนที่จะเคลื่อนที่ในแกน X และ Y ด้วยความเร็วสูงสุด ป้องกันการชน
</ground_truth>
</item>

<item id="27">
<gcode>
G86 Z-15.0 R2.0 F100;
</gcode>
<ground_truth>
(Safe) วัฏจักรคว้านรู (Boring Cycle) ลึก -15.0 มม. เมื่อคว้านเสร็จสปินเดิลจะหยุดหมุนก่อนยกทูลขึ้น
</ground_truth>
</item>

<item id="28">
<gcode>
G16;
G01 X50.0 Y45.0 F200;
G15;
</gcode>
<ground_truth>
(Safe) เปิดโหมดพิกัดเชิงขั้ว (Polar Coordinate) โดย X แทนรัศมี (50.0) และ Y แทนองศา (45.0) จากนั้นปิดโหมดด้วย G15
</ground_truth>
</item>

<item id="29">
<gcode>
G90 G02 X50.0 Y50.0 I25.0 J0.0 F150;
</gcode>
<ground_truth>
(Safe) เดินโค้งตามเข็มนาฬิกาไปยังพิกัด X50.0 Y50.0 โดยระบุระยะจากจุดเริ่มต้นถึงจุดศูนย์กลางส่วนโค้งคือ I=25.0 และ J=0.0
</ground_truth>
</item>

<item id="30">
<gcode>
M08;
G01 X10.0 Z-2.0 F300;
M09;
</gcode>
<ground_truth>
(Safe) เปิดน้ำหล่อเย็น, เดินตัดเนื้องาน, และปิดน้ำหล่อเย็นเมื่อเสร็จสิ้น
</ground_truth>
</item>

### ชุดคำสั่งที่มีข้อผิดพลาดหรือความเสี่ยง (31-40)

<item id="31">
<gcode>
G90 G54 G00 X0 Y0;
G01 Z-5.0 F150;
</gcode>
<ground_truth>
(Dangerous - Missing M03) ไม่มีการสั่งเปิดสปินเดิลหมุน (M03) ก่อนสั่งทูลเดินกินเนื้อวัสดุ (G01 Z-5.0) จะทำให้ทูลกระแทกชิ้นงานจนหัก
</ground_truth>
</item>

<item id="32">
<gcode>
G19;
G02 X20.0 Y20.0 R10.0 F200;
</gcode>
<ground_truth>
(Dangerous - Wrong Plane) คำสั่ง G19 คือการเลือกทำงานในระนาบ Y-Z แต่บรรทัดต่อมาระบุพิกัด X-Y ในการเดินโค้ง เครื่องจะแจ้งเตือน Error ระนาบขัดแย้ง
</ground_truth>
</item>

<item id="33">
<gcode>
G00 X10.0 Y10.0 Z-20.0;
</gcode>
<ground_truth>
(Dangerous - Dogleg Rapid Move) การสั่ง G00 ทิ่มแกน Z ลงลึก -20.0 พร้อมกับขยับแกน X, Y ในบรรทัดเดียว อาจทำให้ทูลพุ่งชนชิ้นงาน หรือแคลมป์จับยึด (ควรยกแกน Z เป็นบวกก่อน หรือแยกบรรทัด)
</ground_truth>
</item>

<item id="34">
<gcode>
M29 S1000;
G84 Z-10.0 R5.0 F10.0;
</gcode>
<ground_truth>
(Dangerous - Incorrect Tapping Feed) วัฏจักรต๊าปเกลียว ต้องตั้งค่า Feed = รอบสปินเดิล x พิตช์เกลียว หากรอบ 1000 แต่ Feed แค่ 10 (พิตช์ 0.01 มม.) ดอกต๊าปจะถูกดึงจนขาดทันที
</ground_truth>
</item>

<item id="35">
<gcode>
T02 M06;
G43 H05 Z10.0;
</gcode>
<ground_truth>
(Dangerous - Tool Offset Mismatch) เปลี่ยนทูลหมายเลข 2 (T02) แต่กลับไปดึงค่าชดเชยความยาวของทูลหมายเลข 5 (H05) มาใช้ หากทูล 5 สั้นกว่าทูล 2 เครื่องจะพุ่งชนชิ้นงานทันที
</ground_truth>
</item>

<item id="36">
<gcode>
G01 X50 Y50 Z-5 F200;
</gcode>
<ground_truth>
(Dangerous - Missing Decimal Point) คอนโทรลเลอร์รุ่นเก่าหลายรุ่น หากไม่ใส่จุดทศนิยม X50 จะถูกตีความหมายเป็น 0.050 มม. ไม่ใช่ 50.0 มม. ทำให้เครื่องเดินไม่ได้ระยะตามต้องการ
</ground_truth>
</item>

<item id="37">
<gcode>
G01 X100.0 Y100.0 F0;
</gcode>
<ground_truth>
(Dangerous - Feedrate is Zero) อัตราป้อนเป็น 0 (F0) ในคำสั่ง G01 เครื่องจะไม่ยอมเคลื่อนที่และอาจขึ้นสัญญาณเตือน (Alarm)
</ground_truth>
</item>

<item id="38">
<gcode>
G00 G01 X50.0 Y50.0 F200;
</gcode>
<ground_truth>
(Dangerous - Conflicting G-codes) มีคำสั่งการเคลื่อนที่ (G00 วิ่งเร็ว และ G01 ตัดเฉือน) อยู่ในบล็อกเดียวกัน เครื่องจะไม่สามารถทำงานได้
</ground_truth>
</item>

<item id="39">
<gcode>
G41 D01 G01 X10.0 Y10.0 F200;
G00 Z50.0;
G00 X0 Y0;
</gcode>
<ground_truth>
(Dangerous - Uncanceled Cutter Comp on Rapid) ยังไม่ได้ยกเลิกค่าชดเชยรัศมี (G40) แต่นำคำสั่ง G00 มาใช้ขยับแกน X, Y อาจทำให้เกิดการเคลื่อนที่โค้งหรือกระตุกเพื่อรักษาแนวชดเชย เสี่ยงต่อการชน
</ground_truth>
</item>

<item id="40">
<gcode>
G01 X50.0 Y50.0 F300 M05;
</gcode>
<ground_truth>
(Dangerous - Spindle Stop While Feeding) สั่งหยุดสปินเดิล (M05) ในบล็อกเดียวกับการเดินตัดเฉือน (G01) สปินเดิลจะหยุดหมุนในขณะที่แกนยังเคลื่อนที่เข้าหาชิ้นงาน ทำให้ทูลหักทันที
</ground_truth>
</item>

</dataset>