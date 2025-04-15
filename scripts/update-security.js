#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * 보안 취약점 패키지 업데이트 스크립트
 * 
 * 이 스크립트는 보안 취약점이 있는 패키지를 업데이트하고,
 * 변경사항을 로깅합니다.
 */

console.log('🔒 보안 취약점 패키지 업데이트 시작...');

// 현재 패키지 정보 백업
const packageJsonPath = path.resolve('package.json');
const packageLockPath = path.resolve('package-lock.json');
const packageJsonBackup = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const packageLockBackup = fs.readFileSync(packageLockPath, 'utf8');

try {
  // 1. axios 취약점 업데이트
  console.log('📦 axios 패키지 업데이트 중...');
  try {
    execSync('npm install axios@latest --save', { stdio: 'inherit' });
  } catch (error) {
    console.warn('⚠️ axios 업데이트 중 경고가 발생했지만 계속합니다:', error.message);
  }

  // 2. vite 관련 취약점 업데이트
  console.log('📦 vite 패키지 업데이트 중...');
  try {
    execSync('npm install vite@latest --save-dev', { stdio: 'inherit' });
    execSync('npm install @vitejs/plugin-react@latest --save-dev', { stdio: 'inherit' });
  } catch (error) {
    console.warn('⚠️ vite 업데이트 중 경고가 발생했지만 계속합니다:', error.message);
  }

  // 3. 의존성 정리 및 취약점 확인
  console.log('🧹 의존성 정리 중...');
  try {
    execSync('npm dedupe', { stdio: 'inherit' });
  } catch (error) {
    console.warn('⚠️ 의존성 정리 중 경고가 발생했지만 계속합니다:', error.message);
  }
  
  // 4. 취약점 스캔
  console.log('🔍 남은 취약점 확인 중...');
  try {
    const auditResult = execSync('npm audit --json', { encoding: 'utf8' });
    try {
      const audit = JSON.parse(auditResult);
      
      if (audit.vulnerabilities && Object.keys(audit.vulnerabilities).length > 0) {
        console.log('⚠️ 남은 취약점:', Object.keys(audit.vulnerabilities).length);
        Object.entries(audit.vulnerabilities).forEach(([name, info]) => {
          console.log(`- ${name}: ${info.severity} 취약점 (${info.via.map(v => typeof v === 'object' ? v.name : v).join(', ')})`);
        });
      } else {
        console.log('✅ 모든 취약점이 해결되었습니다!');
      }
    } catch (parseError) {
      console.warn('⚠️ 취약점 감사 결과 파싱 오류:', parseError.message);
      console.log('원본 감사 결과:');
      console.log(auditResult);
    }
  } catch (auditError) {
    console.warn('⚠️ npm audit 실행 중 오류가 발생했습니다:', auditError.message);
  }

  console.log('🎉 보안 패키지 업데이트 완료!');

} catch (error) {
  console.error('❌ 업데이트 과정에서 오류가 발생했습니다:', error);
  
  // 실패 시 백업 복원
  console.log('♻️ 백업에서 복원 중...');
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonBackup, null, 2), 'utf8');
  fs.writeFileSync(packageLockPath, packageLockBackup, 'utf8');
  
  process.exit(1);
} 